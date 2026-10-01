export async function POST(request: Request) {
  try {
    const apiKey = process.env.NARA_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "NaraRouter API key is not configured." }, { status: 500 });
    }

    const body = await request.json();

    if (body?.mode === "campaign") {
      const brief = String(body.brief || "").trim();
      const platform = String(body.platform || "Instagram");
      const goal = String(body.goal || "Grow audience");
      const audience = String(body.audience || "Content creators and small businesses");

      if (!brief) {
        return Response.json({ error: "Describe what you want to create." }, { status: 400 });
      }

      const campaignPrompt = `You are CreatorHub Studio, an expert AI content strategist for creators and small businesses.

Turn this brief into a practical multi-channel content campaign.

BRIEF:
${brief}

PLATFORM:
${platform}

GOAL:
${goal}

AUDIENCE:
${audience}

Create a useful campaign pack. Do not claim guaranteed virality. Keep ideas specific to the brief.

OUTPUT EXACTLY:

CAMPAIGN CONCEPT
[One clear concept and positioning]

HOOKS
[5 distinct hooks]

PRIMARY CONTENT
[One ready-to-use content concept with a short script/copy]

CAPTION
[One polished caption]

VISUAL PROMPT
[A detailed image-generation prompt]

VIDEO PROMPT
[A detailed AI-video prompt]

HASHTAGS
[12 relevant hashtags]

REPURPOSE IDEAS
[4 ways to adapt the same idea for other formats/platforms]

7-DAY PLAN
[Day 1 through Day 7 with one concrete post idea per day]

NEXT ACTION
[The single most useful action the creator should take next]

Use concise, creator-friendly language. Do not explain your reasoning.`;

      return await callNara({
        apiKey,
        system: "You are CreatorHub Studio. Produce specific, practical content campaigns from short creator briefs.",
        user: campaignPrompt,
        maxTokens: 5000,
      });
    }

    const {
      subject,
      environment,
      action,
      cameraMovement,
      cameraAngle,
      lighting,
      visualStyle,
      duration,
      aspectRatio,
      audio,
      additional,
    } = body;

    if (!subject || !action) {
      return Response.json({ error: "Subject and action are required." }, { status: 400 });
    }

    const userInput = `
USER INPUTS

SUBJECT:
${subject}

ENVIRONMENT:
${environment || "Infer a realistic environment that fits the subject and action."}

ACTION:
${action}

CAMERA MOVEMENT:
${cameraMovement || "Choose a cinematic camera movement that best serves the action."}

CAMERA ANGLE:
${cameraAngle || "Choose a cinematic angle that best presents the subject."}

LIGHTING:
${lighting || "Choose lighting that naturally fits the environment and subject."}

VISUAL STYLE:
${visualStyle || "Choose a polished professional visual style appropriate to the subject."}

DURATION:
${duration || "Choose an appropriate duration."}

ASPECT RATIO:
${aspectRatio || "16:9 landscape"}

AUDIO:
${audio || "Create realistic audio appropriate to the scene."}

ADDITIONAL:
${additional || "No extra constraints. Use professional creative judgment."}
`;

    const systemPrompt = `You are CreatorHub's professional AI Video Prompt Engineer.

Transform the user's simple inputs into a detailed, production-ready prompt for modern AI video generators.

Rules:
- Never write "Not specified", "Not provided", "N/A", or similar placeholders.
- Infer sensible details from the subject, environment and action.
- Respect duration and aspect ratio.
- Keep the main subject consistent throughout the shot.
- Describe realistic physics and continuous motion.
- Do not explain your reasoning or use tables.

Expand camera into shot type, position, angle, movement, framing, tracking, lens/focal length when useful, depth of field and focus.
Expand lighting into practical sources, key/fill/rim light when relevant, reflections, shadows, contrast and exposure.
Build believable foreground, middle-ground and background depth.
Describe the action from start to finish within the duration.
Always create appropriate audio.

For automotive scenes use premium commercial cinematography and realistic vehicle physics.
For people maintain natural movement, anatomy and identity.
For products use controlled commercial lighting and material detail.
For food use macro texture and realistic cooking/serving ambience.
For landscapes use atmospheric depth and natural movement.
For characters maintain consistent appearance.

OUTPUT EXACTLY:
MASTER PROMPT
[Detailed production-ready prompt]

ENVIRONMENT
[Detailed environment]

ACTION
[Detailed physical action]

CAMERA
[Detailed cinematic camera setup]

LIGHTING
[Detailed lighting setup]

VISUAL STYLE
[Detailed visual style]

MOTION & ATMOSPHERE
[Detailed motion and atmosphere]

AUDIO
[Detailed audio]

TECHNICAL DETAILS
[Detailed technical requirements]

ADDITIONAL
[Relevant additional instructions]

Every section must contain specific, useful information.`;

    return await callNara({
      apiKey,
      system: systemPrompt,
      user: userInput,
      maxTokens: 4000,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return Response.json({ error: "Something went wrong while generating content." }, { status: 500 });
  }
}

async function callNara({
  apiKey,
  system,
  user,
  maxTokens,
}: {
  apiKey: string;
  system: string;
  user: string;
  maxTokens: number;
}) {
  const response = await fetch("https://router.bynara.id/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "auto/bynara",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.85,
      max_tokens: maxTokens,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("NaraRouter API error:", data);
    return Response.json(
      { error: data?.error?.message || "NaraRouter API request failed." },
      { status: response.status }
    );
  }

  const generatedText = data?.choices?.[0]?.message?.content || "";

  if (!generatedText) {
    return Response.json({ error: "AI returned an empty response." }, { status: 500 });
  }

  return Response.json({ success: true, prompt: generatedText });
}
