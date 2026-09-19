export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error: "OpenAI API key is not configured."
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
${camera || "Use the most suitable cinematic camera movement and angle."}

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
${additional || "Use your own professional judgment."}
`;

    const systemPrompt = `
You are an expert cinematic AI video prompt engineer.

Your job is to transform simple user inputs into an extremely detailed,
production-quality prompt for modern AI video generators.

IMPORTANT:
- Do NOT simply repeat the user's inputs.
- Expand them intelligently.
- Infer missing details from the subject and environment.
- Make the result visually coherent.
- Use realistic physical motion.
- Keep the subject consistent throughout the video.
- Avoid generic filler.
- Make camera movement specific.
- Make lighting specific.
- Include realistic environmental details.
- Include appropriate audio when useful.
- Adapt the prompt to the subject.

For example:

If the subject is a sports car:
- Use automotive-commercial camera language.
- Include realistic wheel rotation.
- Include reflections on the vehicle.
- Include believable acceleration and road interaction.
- Consider low-angle tracking shots.
- Include engine, tire and environmental audio.

If the subject is a person:
- Include natural body movement.
- Include realistic facial expression and clothing motion.
- Avoid distorted hands, limbs or facial features.

If the subject is a product:
- Treat it like a premium commercial.
- Use controlled camera movement.
- Emphasize product materials, details and reflections.

If the subject is food:
- Emphasize texture, steam, ingredients and appetizing macro shots.

If the subject is a landscape:
- Emphasize atmosphere, environmental motion, depth and natural lighting.

If the subject is a character:
- Maintain consistent appearance, clothing and proportions.

OUTPUT FORMAT:

Start with one polished master prompt.

Then organize supporting instructions under:

ENVIRONMENT
ACTION
CAMERA
LIGHTING
VISUAL STYLE
MOTION & ATMOSPHERE
AUDIO
TECHNICAL DETAILS
ADDITIONAL

Do not include explanations about how you generated the prompt.

Do not use markdown tables.

Do not say "not specified".

The final result should be ready to copy directly into an AI video generator.
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          instructions: systemPrompt,
          input: userInput,
          max_output_tokens: 3000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return Response.json(
        {
          error:
            data?.error?.message ||
            "OpenAI API request failed."
        },
        { status: response.status }
      );
    }

    const generatedText =
      data.output_text ||
      data.output
        ?.flatMap((item: any) => item.content || [])
        ?.filter((item: any) => item.type === "output_text")
        ?.map((item: any) => item.text)
        ?.join("\n") ||
      "";

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
