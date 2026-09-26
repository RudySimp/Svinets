import {
  SETTINGS,
  CONTEXTS,
  LOOT_TYPE_PROFILES,
  PARTY_LEVEL_PROFILES
} from "./data.js";
import { generateLoot, validateData } from "./generator.js";
import { gpToCp, rarityRank } from "./utils.js";
import { DEFAULT_OPTIONS } from "./settings.js";
  // -------------------- 16. SMOKE-ТЕСТЫ --------------------

  function stableResultSignature(result) {
    return JSON.stringify({ lines:result.lines.map(l=>[l.name,l.qty,l.totalCp,l.rarity]), coinsCp:result.coinsCp, flavor:result.flavor?.name??null });
  }

  function runSmokeTests(entries) {
    const tests=[];
    const check=(name,fn)=>{ try{tests.push({test:name,ok:Boolean(fn()),error:''});}catch(error){tests.push({test:name,ok:false,error:error.message});} };
    check('Валидация данных: 1329 raw rows',()=>{ const v=validateData(entries); return v.rawRows===1329; });
    check('Инвариант бюджета: 100 комбинаций',()=>{
      const contexts=Object.keys(CONTEXTS), types=Object.keys(LOOT_TYPE_PROFILES), levels=Object.keys(PARTY_LEVEL_PROFILES), budgets=[0.01,1,10,100,500,1000,5000,50000,250000];
      for(let i=0;i<100;i++){
        const r=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:contexts[i%contexts.length],lootType:types[i%types.length],partyLevel:levels[i%levels.length],budgetGp:budgets[i%budgets.length],seed:10000+i,includeFlavor:false});
        if(r.itemsCp+r.coinsCp!==r.budgetCp) return false;
      }
      return true;
    });
    check('Редкость 1–4 ≤ uncommon',()=>{ const r=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'36K',lootType:'hoard',partyLevel:'1-4',budgetGp:50000,maxRarity:'any',allowLegendary:true,maxMagicItems:5,seed:12345,includeFlavor:false}); return r.lines.filter(l=>l.magic&&l.rarity).every(l=>rarityRank(l.rarity)<=rarityRank('uncommon')); });
    check('Attunement partySize=1 ≤ 3',()=>{ const r=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'14K',lootType:'hoard',partyLevel:'17-20',budgetGp:100000,maxRarity:'veryRare',maxMagicItems:5,partySize:1,seed:12345,includeFlavor:false}); return r.attunementCount<=3; });
    check('Seed 12345 воспроизводим',()=>{ const a=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'36K',budgetGp:10000,seed:12345,includeFlavor:false}); const b=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'36K',budgetGp:10000,seed:12345,includeFlavor:false}); return stableResultSignature(a)===stableResultSignature(b); });
    check('budget=1e12 clamp',()=>generateLoot(entries,{...DEFAULT_OPTIONS,budgetGp:1e12,lootType:'trade',seed:1}).budgetCp===gpToCp(SETTINGS.maxBudgetGp));
    check('budget=0 throws',()=>{try{generateLoot(entries,{...DEFAULT_OPTIONS,budgetGp:0});return false;}catch{return true;}});
    check('v5 hoard 20k: 12–17 строк, 40–70 единиц, монеты 10–35%',()=>{
      const r=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'36K',lootType:'hoard',partyLevel:'any',budgetGp:20000,seed:52001,includeFlavor:false});
      return r.lines.length>=12&&r.lines.length<=17&&r.lines.reduce((n,l)=>n+l.qty,0)>=40&&r.lines.reduce((n,l)=>n+l.qty,0)<=70&&r.actualCoinShare>=0.10&&r.actualCoinShare<=0.35;
    });
    check('v5 hoard 100k: 18–24 строк, 80–150 единиц',()=>{
      const r=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'36K',lootType:'hoard',partyLevel:'any',budgetGp:100000,seed:52002,includeFlavor:false});
      const units=r.lines.reduce((n,l)=>n+l.qty,0);
      return r.lines.length>=18&&r.lines.length<=24&&units>=80&&units<=150;
    });
    check('v5 hoard 1m: 22–30 строк, 150–400 единиц',()=>{
      const r=generateLoot(entries,{...DEFAULT_OPTIONS,contextId:'36K',lootType:'hoard',partyLevel:'any',budgetGp:1000000,seed:52003,includeFlavor:false});
      const units=r.lines.reduce((n,l)=>n+l.qty,0);
      return r.lines.length>=22&&r.lines.length<=30&&units>=150&&units<=400;
    });
    console.group('Svinets | Smoke tests'); console.table(tests); const failed=tests.filter(t=>!t.ok); if(failed.length) console.error('Проваленные тесты:',failed); else console.info(`Все smoke-тесты пройдены: ${tests.length}.`); console.groupEnd();
    return tests;
  }
export { stableResultSignature, runSmokeTests };
