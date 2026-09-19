export async function POST(request: Request) {
  try {
    const apiKey = process.env.NARA_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error: "NaraRouter API key is not configured."
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      subject,
      environment,
      action,
      camera,
      lighting,
      style,
      duration,
      aspectRatio,
      audio,
      additional
    } = body;

    if (!subject || !environment || !action) {
      return Response.json(
        {
          error: "Subject, environment and action are required."
        },
        { status: 400 }
      );
    }

    const userInput = `
Create a professional AI video-generation prompt using these details:

SUBJECT:
${subject}

ENVIRONMENT:
${environment}

ACTION:
${action}

CAMERA:
${camera || "Choose the most suitable cinematic camera movement and angle."}

LIGHTING:
${lighting || "Choose lighting that naturally fits the scene."}

VISUAL STYLE:
${style || "Choose a professional visual style that fits the subject and scene."}

DURATION:
${duration || "Use an appropriate duration."}

ASPECT RATIO:
${aspectRatio || "16:9"}

AUDIO:
${audio || "Create suitable realistic audio for the scene."}

ADDITIONAL:
${additional || "Use professional judgment."}
`;

    const systemPrompt = `
You are an expert cinematic AI video prompt engineer.

Transform simple user inputs into an extremely detailed,
production-quality prompt for modern AI video generators.

IMPORTANT RULES:

- Do NOT simply repeat the user's inputs.
- Expand them intelligently.
- Infer missing details from the subject and environment.
- Make the result visually coherent.
- Use realistic physical motion.
- Keep the subject consistent throughout the video.
- Avoid generic filler.
- Make camera movement specific.
- Make camera angle specific.
- Make lighting specific.
- Include realistic environmental details.
- Include appropriate audio.
- Adapt the prompt to the subject.
- Never write "not specified".
- Never invent irrelevant details.
- Keep the user's requested duration and aspect ratio.

CONTEXT-AWARE BEHAVIOR:

If the subject is a sports car:
- Use premium automotive-commercial cinematography.
- Include realistic wheel rotation.
- Include believable acceleration and road interaction.
- Include reflections on the vehicle.
- Consider low-angle tracking shots.
- Include engine, tire and environmental audio.

If the subject is a person:
- Include natural body movement.
- Include realistic facial expression.
- Include realistic clothing and hair motion.
- Maintain consistent anatomy and appearance.

If the subject is a product:
- Treat it like a premium commercial.
- Emphasize materials, details, textures and reflections.
- Use controlled camera movement.

If the subject is food:
- Emphasize texture, steam, ingredients and appetizing macro cinematography.

If the subject is a landscape:
- Emphasize atmosphere, environmental movement, depth and natural lighting.

If the subject is a character:
- Maintain consistent face, body proportions, clothing and appearance.

OUTPUT:

Start with one polished MASTER PROMPT.

Then organize supporting details under:

ENVIRONMENT
ACTION
CAMERA
LIGHTING
VISUAL STYLE
MOTION & ATMOSPHERE
AUDIO
TECHNICAL DETAILS
ADDITIONAL

The output must be directly copyable into an AI video generator.

Do not explain your reasoning.
Do not include a table.
`;

    const response = await fetch(
      "https://router.bynara.id/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "auto/bynara",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userInput
            }
          ],
          temperature: 0.8,
          max_tokens: 3000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("NaraRouter API error:", data);

      return Response.json(
        {
          error:
            data?.error?.message ||
            "NaraRouter API request failed."
        },
        { status: response.status }
      );
    }

    const generatedText =
      data?.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      return Response.json(
        {
          error: "AI returned an empty response."
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      prompt: generatedText
    });

  } catch (error) {
    console.error("Generation error:", error);

    return Response.json(
      {
        error: "Something went wrong while generating the prompt."
      },
      { status: 500 }
    );
  }
}
