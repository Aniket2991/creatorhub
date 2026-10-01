"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Plus, Trash2 } from "lucide-react";

type Project={id:string;name:string;brief:string;created:string};

export function ProjectWorkspace(){
 const [projects,setProjects]=useState<Project[]>([]);
 const [name,setName]=useState(""); const [brief,setBrief]=useState("");
 useEffect(()=>{try{setProjects(JSON.parse(localStorage.getItem("creatorhub-projects")||"[]"))}catch{}},[]);
 function save(next:Project[]){setProjects(next);localStorage.setItem("creatorhub-projects",JSON.stringify(next))}
 function add(){if(!name.trim())return;save([{id:crypto.randomUUID(),name:name.trim(),brief:brief.trim(),created:new Date().toLocaleDateString()},...projects]);setName("");setBrief("")}
 return <div className="project-panel">
   <div className="project-head"><div><span className="eyebrow">PROJECTS</span><h2>Your creator workspace.</h2><p>Keep campaign briefs and ideas together on this device.</p></div><FolderOpen size={25}/></div>
   <div className="project-create"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name"/><textarea value={brief} onChange={e=>setBrief(e.target.value)} rows={3} placeholder="Short campaign brief..."/><button className="button button-primary" onClick={add}><Plus size={16}/>New Project</button></div>
   <div className="project-list">{projects.length===0?<div className="studio-empty"><strong>No projects yet</strong><p>Create your first campaign project above.</p></div>:projects.map(p=><article className="project-item" key={p.id}><div><strong>{p.name}</strong><small>{p.created}</small><p>{p.brief||"No brief added yet."}</p></div><button className="icon-button" onClick={()=>save(projects.filter(x=>x.id!==p.id))}><Trash2 size={16}/></button></article>)}</div>
 </div>
}
