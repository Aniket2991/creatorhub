import type { ToolSlug } from "./tool-data";

const clean = (value: string | undefined) => value?.trim() || "Not specified";
const numbered = (items: string[]) => items.map((x, i) => `${i + 1}. ${x}`).join("\n\n");

function videoPrompt(d: Record<string, string>) {
  return `Create a ${clean(d.duration)} ${clean(d.aspectRatio)} cinematic video featuring ${clean(d.subject)}.

ENVIRONMENT\n${clean(d.environment)}

ACTION\n${clean(d.action)}

CAMERA\nMovement: ${clean(d.cameraMovement)}\nAngle: ${clean(d.cameraAngle)}\nComposition: subject clearly separated from the background, intentional foreground/background depth, natural visual balance.

LIGHTING\n${clean(d.lighting)}

VISUAL STYLE\n${clean(d.visualStyle)}

MOTION & ATMOSPHERE\nUse believable human motion, physically coherent movement, natural micro-expressions and realistic environmental motion. Keep the scene polished without excessive effects.

AUDIO\n${clean(d.audio)}

TECHNICAL DETAILS\nHigh detail, realistic textures, consistent subject identity, stable exposure, controlled focus transitions, clean motion, no unintended text or watermarks.

ADDITIONAL\n${clean(d.additional)}`;
}

function imagePrompt(d: Record<string, string>) {
  return `Create a ${clean(d.aspectRatio)} image of ${clean(d.subject)}.

ENVIRONMENT\n${clean(d.environment)}

WARDROBE\n${clean(d.clothing)}

POSE\n${clean(d.pose)}

CAMERA\n${clean(d.cameraAngle)}, ${clean(d.lens)}

LIGHTING\n${clean(d.lighting)}

STYLE\n${clean(d.style)}

MOOD\n${clean(d.mood)}

COMPOSITION\nStrong focal hierarchy, natural proportions, realistic depth, clean background separation, visually intentional framing.

DETAILS\n${clean(d.additional)}

QUALITY NOTES\nPhotorealistic detail, realistic skin and materials, anatomically coherent hands, natural shadows, controlled highlights, no random text or watermarks.`;
}

function captions(d: Record<string, string>) {
  const topic = clean(d.topic), niche = clean(d.niche), tone = clean(d.tone), lang = clean(d.language), audience = clean(d.audience), cta = clean(d.cta);
  const starts = lang === "Hindi" ? ["Agar aap creator ho, yeh dekho.", "Ye simple change pura workflow badal sakta hai.", "Creators ke liye ek practical idea:", "Sab kuch complicated hona zaroori nahi.", "Aaj se is workflow ko try karo."] : lang === "Hinglish" ? ["Agar content creation mein time bachaana hai, this is for you.", "Creators, ek simple workflow jo kaam aa sakta hai.", "Posting se pehle ye one thing fix karo.", "AI ka best use sirf trends chase karna nahi hai.", "Aaj ka creator workflow, simplified."] : ["A simpler way to create better content.", "Here is the part most creators skip.", "One practical shift for better content.", "You do not need more ideas. You need a better system.", "A useful workflow for creators who want consistency."];
  return numbered(starts.map((hook, i) => `HOOK\n${hook}\n\nCAPTION\n${topic} — built for ${audience}. The goal is to make ${niche} content clearer, more consistent and easier to publish. Tone: ${tone}.\n\nCTA\n${cta === "Not specified" ? "Save this for your next content session." : cta}`));
}

function hashtags(d: Record<string, string>) {
  const topic = clean(d.topic).toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "");
  const niche = clean(d.niche).toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "");
  const platform = clean(d.platform).toLowerCase();
  const audience = clean(d.audience).toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "");
  return `BROAD\n#contentcreator #socialmedia #contentcreation #digitalcreator #creatoreconomy\n\nNICHE\n#${niche} #aitools #aicreator #${topic}\n\nCOMMUNITY\n#${audience || "creators"} #creatorcommunity #contenttips #creatorresources\n\nLONG-TAIL\n#${topic}tips #${topic}content #${platform}creator #${topic}forcreators\n\nNote: these are structured hashtag ideas, not claims of real-time trending status.`;
}

function hooks(d: Record<string, string>) {
  const topic = clean(d.topic), platform = clean(d.platform), audience = clean(d.audience), tone = clean(d.tone);
  const items = [
    `You are making ${topic} harder than it needs to be.`,
    `I tested a simpler way to approach ${topic}.`,
    `Before you publish another ${platform} post, do this first.`,
    `Most creators focus on the output. Start with this instead.`,
    `Here is the ${topic} workflow I would use from scratch.`,
    `What would change if you cut one step from your content process?`,
    `The unpopular part of ${topic}: more tools are not always better.`,
    `For ${audience}, this is the first thing I would fix.`,
    `Stop copying formats blindly. Build this around the idea instead.`,
    `Want a cleaner way to turn an idea into publishable content?`
  ];
  return `Tone: ${tone}\nPlatform: ${platform}\n\n${numbered(items)}`;
}

function youtubeTitles(d: Record<string, string>) {
  const topic = clean(d.topic), niche = clean(d.niche), audience = clean(d.audience);
  const styles = [
    `I Tried ${topic} — Here’s What Happened`,
    `${topic}: A Beginner's Guide`,
    `7 Practical Ways to Use ${topic}`,
    `How to Fix the Biggest ${topic} Mistake`,
    `I Built a ${topic} Workflow From Scratch`,
    `${topic} Explained for ${audience}`,
    `The Simple ${topic} System for Creators`,
    `${topic} Without the Confusion`,
    `What I Wish I Knew Before ${topic}`,
    `${topic}: 10 Ideas You Can Use Today`,
    `How I Would Approach ${topic} in ${new Date().getFullYear()}`,
    `${topic} — Step by Step`,
    `The Real Problem With ${topic}`,
    `${topic}: A Smarter Workflow for ${niche}`,
    `Start Here: ${topic}`
  ];
  return numbered(styles);
}

function bios(d: Record<string, string>) {
  const brand = clean(d.brand), niche = clean(d.niche), personality = clean(d.personality), audience = clean(d.audience), cta = clean(d.cta);
  return numbered([
    `${brand} ✦\n${niche}\n${personality}\nHelping ${audience}\n${cta}`,
    `${brand} | ${niche}\nPractical ideas. Simple systems.\nFor ${audience}.\n${cta}`,
    `${brand} ✦ ${niche}\nMaking content creation simpler.\n${personality}\n${cta}`,
    `${brand}\n${niche} creator\nIdeas → content → growth\nFor ${audience}\n${cta}`,
    `${brand} | ${niche}\nNo-fluff creator resources\n${personality}\n${cta}`
  ]);
}

function contentIdeas(d: Record<string, string>) {
  const niche = clean(d.niche), platform = clean(d.platform), audience = clean(d.audience), type = clean(d.contentType), count = Math.min(Number(d.count) || 10, 20);
  const angles = ["beginner mistakes", "before vs after", "step-by-step tutorial", "myth vs reality", "quick checklist", "behind the scenes", "tool comparison", "workflow breakdown", "case-study style example", "common questions", "30-day challenge", "template walkthrough", "hot take with evidence", "creator story", "resource roundup", "mini tutorial", "problem/solution", "process reveal", "FAQ", "what I would do from zero"];
  return Array.from({ length: count }, (_, i) => {
    const angle = angles[i];
    return `${i + 1}. IDEA\n${niche}: ${angle}\n\nHOOK\nA useful ${angle} angle for ${audience}.\n\nFORMAT\n${type} on ${platform}\n\nDESCRIPTION\nShow one clear lesson, one concrete example and one next step. Keep the opening focused on the audience's problem, then demonstrate the workflow.\n\nCTA\nSave this, share it with a creator, or try the workflow on your next post.`;
  }).join("\n\n---\n\n");
}

export function generateToolOutput(slug: ToolSlug, data: Record<string, string>) {
  switch (slug) {
    case "video-prompt": return videoPrompt(data);
    case "image-prompt": return imagePrompt(data);
    case "caption": return captions(data);
    case "hashtags": return hashtags(data);
    case "hooks": return hooks(data);
    case "youtube-title": return youtubeTitles(data);
    case "instagram-bio": return bios(data);
    case "content-ideas": return contentIdeas(data);
  }
}
