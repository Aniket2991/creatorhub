"use client";

import { useEffect, useState } from "react";
import { Save, Sparkles, Trash2 } from "lucide-react";

type Brand = { name:string; niche:string; audience:string; tone:string; offer:string; cta:string; colors:string };

const blank: Brand = { name:"", niche:"", audience:"", tone:"", offer:"", cta:"", colors:"" };

export function BrandProfile() {
  const [brand,setBrand]=useState<Brand>(blank);
  const [saved,setSaved]=useState(false);
  useEffect(()=>{ try { const raw=localStorage.getItem("creatorhub-brand"); if(raw) setBrand({...blank,...JSON.parse(raw)}); } catch {} },[]);
  function update(key:keyof Brand,value:string){setBrand(b=>({...b,[key]:value}));setSaved(false)}
  function save(){localStorage.setItem("creatorhub-brand",JSON.stringify(brand));setSaved(true)}
  function clear(){localStorage.removeItem("creatorhub-brand");setBrand(blank);setSaved(false)}
  return <div className="brand-panel">
    <div className="brand-panel-head"><div><span className="eyebrow">BRAND PROFILE</span><h2>Teach CreatorHub about your brand.</h2><p>Saved locally in this browser. No account is required.</p></div><Sparkles size={24}/></div>
    <div className="brand-grid">
      {([["name","Brand / creator name","e.g. Aniket Creates"],["niche","Niche","e.g. AI + content creation"],["audience","Target audience","e.g. Indian small businesses"],["tone","Brand voice","e.g. practical, energetic, simple"],["offer","Product / service","e.g. AI content services"],["cta","Default CTA","e.g. DM me to get started"],["colors","Brand colours","e.g. purple, cyan, white"]] as const).map(([key,label,placeholder])=><label key={key}><span>{label}</span><input value={brand[key]} placeholder={placeholder} onChange={e=>update(key,e.target.value)}/></label>)}
    </div>
    <div className="brand-actions"><button className="button button-primary" onClick={save}><Save size={16}/>{saved?"Saved":"Save Brand Profile"}</button><button className="button button-secondary" onClick={clear}><Trash2 size={16}/>Clear</button></div>
  </div>
}
