"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Plus, Trash2 } from "lucide-react";

type Project = { id:string; name:string; brief:string; created:string; platform:string; goal:string; campaign:string };

const key = "creatorhub-projects";

export function ProjectWorkspace(){
 const [projects,setProjects]=useState<Project[]>([]);
 const [name,setName]=useState("");
 const [brief,setBrief]=useState("");
 const [selected,setSelected]=useState<string|null>(null);

 useEffect(()=>{try{setProjects(JSON.parse(localStorage.getItem(key)||"[]"))}catch{}},[]);

 function save(next:Project[]){setProjects(next);localStorage.setItem(key,JSON.stringify(next))}
 function add(){
   if(!name.trim()) return;
   const project:Project={id:crypto.randomUUID(),name:name.trim(),brief:brief.trim(),created:new Date().toLocaleDateString(),platform:"Instagram",goal:"Grow audience",campaign:""};
   save([project,...projects]); setSelected(project.id); setName(""); setBrief("");
 }
 function remove(id:string){save(projects.filter(x=>x.id!==id));if(selected===id)setSelected(null)}
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
         <button className="project-select" onClick={()=>setSelected(p.id)}><div><strong>{p.name}</strong><small>{p.created} · {p.platform}</small><p>{p.brief||"No brief added yet."}</p></div></button>
         <button className="icon-button" onClick={()=>remove(p.id)} aria-label={`Delete ${p.name}`}><Trash2 size={16}/></button>
       </article>)}
   </div>
   {active && <div className="project-detail"><span className="eyebrow">ACTIVE PROJECT</span><h3>{active.name}</h3><p>{active.brief || "No brief saved for this project yet."}</p><div className="project-detail-meta"><span>{active.platform}</span><span>{active.goal}</span><span>{active.campaign ? "Campaign saved" : "Campaign not generated yet"}</span></div></div>}
 </div>
}
