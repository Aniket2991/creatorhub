import type { ToolSlug } from "./tool-data";

const value = (data: Record<string, string>, key: string, fallback: string) => {
  const raw = data[key]?.trim();
  return raw || fallback;
};

const numbered = (items: string[]) => items.map((x, i) => `${i + 1}. ${x}`).join("\n\n");
const list = (items: string[]) => items.filter(Boolean).join(", ");
const titleCase = (text: string) => text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
const slugWord = (text: string, fallback: string) => {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").trim().replace(/\s+/g, "");
  return cleaned || fallback;
};

function videoPrompt(d: Record<string, string>) {
  const subject = value(d, "subject", "a cinematic creator-focused subject");
  const environment = value(d, "environment", "a visually rich real-world environment with natural depth and believable details");
  const action = value(d, "action", "moves naturally through the environment with clear beginning, middle and end motion");
  const movement = value(d, "cameraMovement", "a smooth tracking shot with subtle cinematic parallax");
  const angle = value(d, "cameraAngle", "a low three-quarter angle that keeps the subject dominant in frame");
  const lighting = value(d, "lighting", "soft cinematic key light with practical environmental highlights and controlled contrast");
  const style = value(d, "visualStyle", "photorealistic cinematic commercial style");
  const duration = value(d, "duration", "8 seconds");
  const ratio = value(d, "aspectRatio", "9:16 vertical");
  const audio = value(d, "audio", "natural environmental ambience, realistic movement sounds and subtle spatial detail; no music unless specified");
  const additional = value(d, "additional", "maintain consistent subject appearance, realistic physics, clean motion and no unintended text or watermarks");

  return `Create a ${duration} ${ratio} cinematic video featuring ${subject}.

SCENE
${environment}. Establish clear foreground, subject and background layers so the shot has natural depth and visual separation.

ACTION
${action}. Movement should feel physically coherent with believable acceleration, weight, contact and environmental interaction.

CAMERA
Movement: ${movement}
Angle: ${angle}
Composition: Keep the subject as the visual anchor, use intentional headroom and leading lines, and maintain a balanced frame throughout the shot.
Focus: Use controlled focus transitions that support the action without distracting from the subject.

LIGHTING
${lighting}. Preserve realistic reflections, skin/material response and highlight detail without clipped whites or artificial glow.

VISUAL STYLE
${style}. Aim for premium cinematic realism, coherent textures and natural color relationships.

MOTION & ATMOSPHERE
Use realistic environmental motion, subtle secondary movement and natural micro-details. Avoid excessive effects, rubbery motion, warped geometry or unnecessary camera shake.

AUDIO
${audio}.

TECHNICAL DETAILS
High detail, realistic textures, stable exposure, consistent subject identity, coherent perspective, clean motion blur, natural depth of field, accurate shadows and physically plausible reflections. No unintended text, logos, captions or watermarks.

ADDITIONAL
${additional}.`;
}

function imagePrompt(d: Record<string, string>) {
  const subject = value(d, "subject", "a confident modern creator");
  const environment = value(d, "environment", "a clean contemporary environment with subtle depth and realistic background detail");
  const clothing = value(d, "clothing", "modern understated clothing appropriate to the scene");
  const pose = value(d, "pose", "a natural relaxed pose with believable posture and hands");
  const angle = value(d, "cameraAngle", "eye-level three-quarter angle");
  const lens = value(d, "lens", "50mm lens with natural perspective and moderate background separation");
  const lighting = value(d, "lighting", "large soft key light with subtle fill and rim separation");
  const style = value(d, "style", "premium photorealistic editorial photography");
  const mood = value(d, "mood", "confident, calm and polished");
  const ratio = value(d, "aspectRatio", "4:5 portrait");
  const details = value(d, "additional", "natural skin/material texture, realistic hands, coherent proportions and a clean background");

  return `Create a ${ratio} image of ${subject}.

ENVIRONMENT
${environment}. Build believable depth with a clean relationship between foreground, subject and background.

WARDROBE
${clothing}. Materials should have realistic texture, folds and light response.

POSE
${pose}. Keep anatomy, hands, facial features and body proportions coherent and natural.

CAMERA
Angle: ${angle}
Lens: ${lens}
Composition: strong focal hierarchy, intentional framing, natural negative space and clear subject separation.

LIGHTING
${lighting}. Use realistic shadow falloff, controlled highlights and consistent light direction.

STYLE
${style}.

MOOD
${mood}.

DETAILS
${details}.

QUALITY NOTES
High-resolution detail, realistic materials, natural color, accurate perspective, coherent reflections and believable depth of field. Avoid distorted anatomy, duplicated objects, random text, unwanted logos and watermarks.`;
}

function captions(d: Record<string, string>) {
  const topic = value(d, "topic", "better content creation");
  const niche = value(d, "niche", "content creation");
  const tone = value(d, "tone", "Confident");
  const lang = value(d, "language", "English");
  const audience = value(d, "audience", "creators");
  const cta = value(d, "cta", "Save this for your next content session.");
  const hooks = lang === "Hindi"
    ? ["Agar aap creator ho, is idea ko save kar lo.", "Content banana mushkil nahi, system banana important hai.", "Creators ke liye ek simple workflow jo kaam aa sakta hai.", "Aaj se content creation ko thoda smarter banao.", "Aapke next post ke liye ek practical idea."]
    : lang === "Hinglish"
      ? ["Agar content creation mein time bachana hai, this is for you.", "Creators, ek simple workflow jo genuinely useful ho sakta hai.", "Posting se pehle ye one thing fix karo.", "AI ka best use sirf trends chase karna nahi hai.", "Aaj ka creator workflow, simplified."]
      : ["A simpler way to create better content.", "Here is the part most creators skip.", "One practical shift for better content.", "You do not need more ideas. You need a better system.", "A useful workflow for creators who want consistency."];

  return numbered(hooks.map((hook, i) => {
    const angle = ["problem → solution", "practical workflow", "quick lesson", "myth → better approach", "simple next step"][i];
    return `HOOK\n${hook}\n\nCAPTION\n${topic} does not have to feel complicated. For ${audience} in ${niche}, a ${angle} can make the process clearer, faster and easier to repeat. Keep the message focused, show one concrete example, and make the next step obvious.\n\nTONE\n${tone}\n\nCTA\n${cta}`;
  }));
}

function hashtags(d: Record<string, string>) {
  const topic = slugWord(value(d, "topic", "content creation"), "contentcreation");
  const niche = slugWord(value(d, "niche", "creators"), "creators");
  const platform = value(d, "platform", "Instagram").toLowerCase().replace(/\s+/g, "");
  const audience = slugWord(value(d, "audience", "creators"), "creators");
  const topicWords = topic.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return `BROAD\n#contentcreator #contentcreation #socialmedia #digitalcreator #creatoreconomy\n\nNICHE\n#${niche} #aitools #aicreator #${topic}\n\nCOMMUNITY\n#${audience} #creatorcommunity #contenttips #creatorresources\n\nLONG-TAIL\n#${topic}tips #${topic}content #${platform}creator #${topic}forcreators\n\nUSAGE NOTE\nThese are structured hashtag ideas based on your inputs. They are not claims of real-time trending status. Review relevance and platform limits before publishing.\n\nTOPIC NORMALIZATION\n${titleCase(topicWords)}`;
}

function hooks(d: Record<string, string>) {
  const topic = value(d, "topic", "content creation");
  const platform = value(d, "platform", "Instagram Reels");
  const audience = value(d, "audience", "creators");
  const tone = value(d, "tone", "Curious");
  const items = [
    `You are making ${topic} harder than it needs to be.`,
    `I tested a simpler way to approach ${topic}.`,
    `Before you publish another ${platform} post, do this first.`,
    `Most creators focus on the output. Start with this instead.`,
    `Here is the ${topic} workflow I would use from scratch.`,
    `What would change if you removed one unnecessary step from ${topic}?`,
    `The overlooked part of ${topic}: more tools are not always better.`,
    `For ${audience}, this is the first thing I would fix.`,
    `Stop copying formats blindly. Build the format around the idea instead.`,
    `Want a cleaner way to turn an idea into publishable content?`
  ];
  const categories = ["Curiosity", "Story", "Problem", "Benefit", "Question", "Contrarian", "Contrarian", "Audience-specific", "Problem", "Benefit"];
  return `TONE: ${tone}\nPLATFORM: ${platform}\n\n${numbered(items.map((item, i) => `${categories[i]}\n${item}`))}\n\nNote: these are creative hook directions, not guarantees of virality.`;
}

function youtubeTitles(d: Record<string, string>) {
  const topic = value(d, "topic", "AI content creation");
  const niche = value(d, "niche", "AI + productivity");
  const audience = value(d, "audience", "beginner creators");
  const style = value(d, "style", "Curiosity");
  const year = new Date().getFullYear();
  const groups = [
    ["Curiosity", `I Tried ${topic} — Here's What Happened`, `The ${topic} Trick I Wish I Knew Earlier`, `What Nobody Tells You About ${topic}`],
    ["Educational", `${topic}: A Beginner's Guide`, `How to Use ${topic} Step by Step`, `${topic} Explained Simply`],
    ["List", `7 Practical Ways to Use ${topic}`, `10 ${topic} Ideas You Can Use Today`, `5 Mistakes to Avoid With ${topic}`],
    ["Problem / Solution", `How to Fix the Biggest ${topic} Mistake`, `Why ${topic} Isn't Working — And What to Do Instead`, `The Simple ${topic} System That Solves the Bottleneck`],
    ["Story", `I Built a ${topic} Workflow From Scratch`, `What Happened When I Used ${topic} for 30 Days`, `My ${topic} Experiment: What Actually Worked`],
    ["Search-friendly", `${topic} for ${audience}`, `${topic} Tutorial for Beginners`, `${topic}: Complete ${year} Workflow for ${niche}`]
  ];
  const selected = groups.find(([name]) => name === style)?.slice(1) || groups.flatMap((group) => group.slice(1));
  return `STYLE: ${style}\n\n${numbered(selected)}\n\nSEARCH NOTE\nThese are title directions. Choose the title that accurately matches the video's actual content and avoid claims the video cannot support.`;
}

function bios(d: Record<string, string>) {
  const brand = value(d, "brand", "CreatorHub");
  const niche = value(d, "niche", "AI + content creation");
  const personality = value(d, "personality", "Simple, practical, energetic");
  const audience = value(d, "audience", "creators and freelancers");
  const cta = value(d, "cta", "Free tools below ↓");
  return numbered([
    `${brand} ✦\n${niche}\n${personality}\nHelping ${audience}\n${cta}`,
    `${brand} | ${niche}\nPractical ideas. Simple systems.\nFor ${audience}.\n${cta}`,
    `${brand} ✦ ${niche}\nMaking content creation simpler.\n${personality}\n${cta}`,
    `${brand}\n${niche} creator\nIdeas → content → growth\nFor ${audience}\n${cta}`,
    `${brand} | ${niche}\nNo-fluff creator resources\n${personality}\n${cta}`
  ]);
}

function contentIdeas(d: Record<string, string>) {
  const niche = value(d, "niche", "AI tools for creators");
  const platform = value(d, "platform", "Instagram");
  const audience = value(d, "audience", "beginner creators");
  const type = value(d, "contentType", "Reels");
  const count = Math.min(Math.max(Number(d.count) || 10, 1), 20);
  const angles = [
    ["Beginner mistakes", "Show the three mistakes beginners make and the simple correction for each."],
    ["Before vs after", "Compare a weak version with a stronger version and explain the changes."],
    ["Step-by-step tutorial", "Walk through the workflow from blank page to finished result."],
    ["Myth vs reality", "Take one common assumption and contrast it with a practical reality."],
    ["Quick checklist", "Turn the topic into a short checklist viewers can save and revisit."],
    ["Behind the scenes", "Show the actual process, decisions and tools used to create the result."],
    ["Tool comparison", "Compare two approaches and explain when each makes sense."],
    ["Workflow breakdown", "Break the process into repeatable stages with a concrete example."],
    ["Case-study style", "Start with a realistic scenario and show the decisions that lead to the outcome."],
    ["Common questions", "Answer the questions a beginner is most likely to ask before starting."],
    ["30-day challenge", "Turn the niche into a small daily challenge with a visible progression."],
    ["Template walkthrough", "Give a reusable template and demonstrate it on one example."],
    ["Evidence-based hot take", "Challenge a common practice while explaining the reasoning behind the alternative."],
    ["Creator story", "Tell a short story about a mistake, lesson or workflow change."],
    ["Resource roundup", "Curate a small set of useful resources and explain what each is for."],
    ["Mini tutorial", "Teach one narrow skill that can be applied immediately."],
    ["Problem / solution", "Start with a specific pain point and demonstrate the simplest useful fix."],
    ["Process reveal", "Show the exact sequence behind a polished result."],
    ["FAQ", "Answer five short questions in one focused piece of content."],
    ["Start from zero", "Explain what you would do first if you had to build the workflow from scratch."]
  ];
  return Array.from({ length: count }, (_, i) => {
    const [angle, description] = angles[i % angles.length];
    return `${i + 1}. IDEA\n${niche}: ${angle}\n\nHOOK\nA practical ${angle.toLowerCase()} idea for ${audience}.\n\nFORMAT\n${type} on ${platform}\n\nDESCRIPTION\n${description} Keep the opening focused on one problem, demonstrate one concrete example, and finish with an actionable takeaway.\n\nCTA\nSave this for later, share it with a creator, or try the workflow on your next post.`;
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
