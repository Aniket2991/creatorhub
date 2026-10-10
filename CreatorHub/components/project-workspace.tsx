"use client";

import { useEffect, useState } from "react";
import { Copy, FolderOpen, Plus, Trash2 } from "lucide-react";

type Project = { id:string; name:string; brief:string; created:string; platform:string; goal:string; campaign:string };

const key = "creatorhub-projects";

export function ProjectWorkspace(){
 const [projects,setProjects]=useState<Project[]>([]);
 const [name,setName]=useState("");
 const [brief,setBrief]=useState("");
 const [selected,setSelected]=useState<string|null>(null);
 const [copied,setCopied]=useState(false);

 useEffect(()=>{
   try{setProjects(JSON.parse(localStorage.getItem(key)||"[]"))}catch{}
   const saved=localStorage.getItem("creatorhub-active-project");
   if(saved) setSelected(saved);
   const onSaved=()=>{try{setProjects(JSON.parse(localStorage.getItem(key)||"[]"))}catch{}};
   window.addEventListener("creatorhub-project-saved",onSaved);
   return ()=>window.removeEventListener("creatorhub-project-saved",onSaved);
 },[]);

 function save(next:Project[]){setProjects(next);localStorage.setItem(key,JSON.stringify(next))}
 function selectProject(id:string){
   setSelected(id);
   localStorage.setItem("creatorhub-active-project",id);
   window.dispatchEvent(new CustomEvent("creatorhub-project-change",{detail:id}));
 }
 function add(){
   if(!name.trim()) return;
   const project:Project={id:crypto.randomUUID(),name:name.trim(),brief:brief.trim(),created:new Date().toLocaleDateString(),platform:"Instagram",goal:"Grow audience",campaign:""};
   save([project,...projects]);
   selectProject(project.id);
   setName(""); setBrief("");
 }
 async function copyCampaign(campaign:string){
   if(!campaign) return;
   try{await navigator.clipboard.writeText(campaign);setCopied(true);window.setTimeout(()=>setCopied(false),1500)}catch{}
 }
 function remove(id:string){
   const next=projects.filter(x=>x.id!==id);
   save(next);
   if(selected===id){
     const nextId=next[0]?.id||null;
     setSelected(nextId);
     if(nextId){localStorage.setItem("creatorhub-active-project",nextId);window.dispatchEvent(new CustomEvent("creatorhub-project-change",{detail:nextId}));}
     else{localStorage.removeItem("creatorhub-active-project");window.dispatchEvent(new CustomEvent("creatorhub-project-change",{detail:null}));}
   }
 }
 const active=projects.find(x=>x.id===selected);

 return <div className="project-panel">
   <div className="project-head"><div><span className="eyebrow">PROJECTS</span><h2>Your creator workspace.</h2><p>Save campaign work locally so your ideas stay organized between sessions.</p></div><FolderOpen size={25}/></div>
   <div className="project-create">
     <input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name"/>
     <textarea value={brief} onChange={e=>setBrief(e.target.value)} rows={3} placeholder="Short campaign brief..."/>
     <button className="button button-primary" onClick={add}><Plus size={16}/>New Project</button>
   </div>
   <div className="project-list">
     {projects.length===0?<div className="studio-empty"><strong>No projects yet</strong><p>Create your first campaign project above.</p></div>:
       projects.map(p=><article className={selected===p.id?"project-item project-item-active":"project-item"} key={p.id}>
         <button className="project-select" onClick={()=>selectProject(p.id)}><div><strong>{p.name}</strong><small>{p.created} · {p.platform}</small><p>{p.brief||"No brief added yet."}</p></div></button>
         <button className="icon-button" onClick={()=>remove(p.id)} aria-label={`Delete ${p.name}`}><Trash2 size={16}/></button>
       </article>)}
   </div>
   {active && <div className="project-detail"><span className="eyebrow">ACTIVE PROJECT</span><h3>{active.name}</h3><p>{active.brief || "No brief saved for this project yet."}</p><div className="project-detail-meta"><span>{active.platform}</span><span>{active.goal}</span><span>{active.campaign ? "Campaign saved" : "Campaign not generated yet"}</span></div>{active.campaign && <div className="project-saved-campaign"><div className="project-saved-head"><strong>Saved campaign</strong><button className="icon-button" onClick={()=>copyCampaign(active.campaign)} aria-label="Copy saved campaign"><Copy size={15}/></button></div><pre>{active.campaign}</pre>{copied && <small className="studio-copied">Copied</small>}</div>}</div>}
 </div>
}
