export type ToolSlug =
  | "video-prompt"
  | "image-prompt"
  | "caption"
  | "hashtags"
  | "hooks"
  | "youtube-title"
  | "instagram-bio"
  | "content-ideas";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  defaultValue?: string;
};

export type ToolDefinition = {
  slug: ToolSlug;
  name: string;
  description: string;
  eyebrow: string;
  icon: string;
  fields: Field[];
};

export const tools: ToolDefinition[] = [
  {
    slug: "video-prompt",
    name: "Video Prompt Generator",
    description: "Create detailed cinematic prompts for AI video generation.",
    eyebrow: "VIDEO",
    icon: "Video",
    fields: [
      { name: "subject", label: "Subject", placeholder: "A streetwear creator walking through Tokyo", required: true },
      { name: "environment", label: "Location / environment", placeholder: "Neon-lit Shibuya side street at dusk" },
      { name: "action", label: "Action", placeholder: "Walks toward camera, pauses, adjusts jacket" },
      { name: "cameraMovement", label: "Camera movement", placeholder: "Slow gimbal push-in with a subtle orbit" },
      { name: "cameraAngle", label: "Camera angle", placeholder: "Low three-quarter angle" },
      { name: "lighting", label: "Lighting", placeholder: "Soft blue hour light with warm storefront spill" },
      { name: "visualStyle", label: "Visual style", placeholder: "Premium fashion campaign, photorealistic" },
      { name: "duration", label: "Duration", type: "select", options: ["5 seconds", "8 seconds", "10 seconds", "15 seconds"], defaultValue: "8 seconds" },
      { name: "aspectRatio", label: "Aspect ratio", type: "select", options: ["9:16 vertical", "16:9 landscape", "1:1 square"], defaultValue: "9:16 vertical" },
      { name: "audio", label: "Audio / dialogue", placeholder: "City ambience, footsteps, no dialogue" },
      { name: "additional", label: "Additional instructions", type: "textarea", placeholder: "Keep face identity consistent; clean background; avoid text overlays." }
    ]
  },
  {
    slug: "image-prompt",
    name: "Image Prompt Generator",
    description: "Turn your ideas into detailed image-generation prompts.",
    eyebrow: "IMAGE",
    icon: "Image",
    fields: [
      { name: "subject", label: "Subject", placeholder: "Confident creator holding a compact camera", required: true },
      { name: "environment", label: "Environment", placeholder: "Minimal modern studio with textured concrete wall" },
      { name: "clothing", label: "Clothing", placeholder: "Cream overshirt, black trousers, clean sneakers" },
      { name: "pose", label: "Pose", placeholder: "Relaxed standing pose, slight shoulder turn" },
      { name: "cameraAngle", label: "Camera angle", placeholder: "Eye level, three-quarter portrait" },
      { name: "lens", label: "Lens", placeholder: "50mm portrait lens, shallow depth of field" },
      { name: "lighting", label: "Lighting", placeholder: "Large softbox key light with subtle rim light" },
      { name: "style", label: "Style", placeholder: "Editorial commercial photography" },
      { name: "mood", label: "Mood", placeholder: "Confident, calm, premium" },
      { name: "aspectRatio", label: "Aspect ratio", type: "select", options: ["4:5 portrait", "1:1 square", "16:9 landscape", "9:16 vertical"], defaultValue: "4:5 portrait" },
      { name: "additional", label: "Additional details", type: "textarea", placeholder: "Natural skin texture, realistic hands, uncluttered composition." }
    ]
  },
  {
    slug: "caption",
    name: "Instagram Caption Generator",
    description: "Create five ready-to-edit caption options for social media.",
    eyebrow: "GROW",
    icon: "Instagram",
    fields: [
      { name: "topic", label: "Topic", placeholder: "My new AI-powered content workflow", required: true },
      { name: "niche", label: "Niche", placeholder: "AI tools / creator economy" },
      { name: "tone", label: "Tone", type: "select", options: ["Confident", "Friendly", "Educational", "Playful", "Minimal"], defaultValue: "Confident" },
      { name: "language", label: "Language", type: "select", options: ["English", "Hinglish", "Hindi"], defaultValue: "English" },
      { name: "audience", label: "Target audience", placeholder: "Beginner creators and freelancers" },
      { name: "cta", label: "CTA", placeholder: "Save this and try it today" }
    ]
  },
  {
    slug: "hashtags",
    name: "Hashtag Generator",
    description: "Build structured hashtag sets by breadth, niche, community and long-tail intent.",
    eyebrow: "GROW",
    icon: "Hash",
    fields: [
      { name: "topic", label: "Topic", placeholder: "AI content creation", required: true },
      { name: "niche", label: "Niche", placeholder: "Content creators" },
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "YouTube", "TikTok", "LinkedIn"], defaultValue: "Instagram" },
      { name: "audience", label: "Target audience", placeholder: "Indian creators, freelancers" }
    ]
  },
  {
    slug: "hooks",
    name: "Viral Hook Generator",
    description: "Generate ten attention-grabbing hooks without promising guaranteed virality.",
    eyebrow: "VIDEO",
    icon: "Zap",
    fields: [
      { name: "topic", label: "Topic", placeholder: "Using AI to create Reels faster", required: true },
      { name: "platform", label: "Platform", type: "select", options: ["Instagram Reels", "YouTube Shorts", "TikTok", "LinkedIn"], defaultValue: "Instagram Reels" },
      { name: "audience", label: "Audience", placeholder: "Creators with limited time" },
      { name: "tone", label: "Tone", type: "select", options: ["Curious", "Bold", "Educational", "Conversational", "Contrarian"], defaultValue: "Curious" }
    ]
  },
  {
    slug: "youtube-title",
    name: "YouTube Title Generator",
    description: "Generate fifteen title directions across curiosity, education, lists, stories and search intent.",
    eyebrow: "GROW",
    icon: "Youtube",
    fields: [
      { name: "topic", label: "Video topic", placeholder: "How I use AI to plan 30 days of content", required: true },
      { name: "niche", label: "Channel niche", placeholder: "AI + productivity" },
      { name: "audience", label: "Audience", placeholder: "Beginner creators" },
      { name: "style", label: "Style", type: "select", options: ["Curiosity", "Educational", "List", "Problem / Solution", "Story", "Search-friendly"], defaultValue: "Curiosity" }
    ]
  },
  {
    slug: "instagram-bio",
    name: "Instagram Bio Generator",
    description: "Create five concise profile bios around your niche, personality and CTA.",
    eyebrow: "GROW",
    icon: "UserRound",
    fields: [
      { name: "brand", label: "Name / brand", placeholder: "Aniket Creates", required: true },
      { name: "niche", label: "Niche", placeholder: "AI + content creation" },
      { name: "personality", label: "Personality", placeholder: "Simple, practical, energetic" },
      { name: "audience", label: "Audience", placeholder: "Creators and freelancers" },
      { name: "cta", label: "CTA", placeholder: "Free tools below ↓" }
    ]
  },
  {
    slug: "content-ideas",
    name: "Content Idea Generator",
    description: "Generate up to twenty content concepts with a hook, format, description and CTA.",
    eyebrow: "GROW",
    icon: "Lightbulb",
    fields: [
      { name: "niche", label: "Niche", placeholder: "AI tools for creators", required: true },
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "YouTube", "LinkedIn", "TikTok"], defaultValue: "Instagram" },
      { name: "audience", label: "Audience", placeholder: "Beginner creators" },
      { name: "contentType", label: "Content type", type: "select", options: ["Reels", "Carousel", "Shorts", "Post", "Long-form video"], defaultValue: "Reels" },
      { name: "count", label: "Number of ideas", type: "select", options: ["5", "10", "15", "20"], defaultValue: "10" }
    ]
  }
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
