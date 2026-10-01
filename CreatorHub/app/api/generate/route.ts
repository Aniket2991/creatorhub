export async function POST(request: Request) {
  try {
    const apiKey = process.env.NARA_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "NaraRouter API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();

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
      return Response.json(
        { error: "Subject and action are required." },
        { status: 400 }
      );
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

    const systemPrompt = `
You are CreatorHub's professional AI Video Prompt Engineer.

Transform the user's simple inputs into a detailed, production-ready
prompt for modern AI video generators.

The user may provide only a few words. Expand them intelligently.
Do not merely repeat the input.

QUALITY RULES:

- Never write "Not specified", "Not provided", "N/A", or similar placeholders.
- Never leave a requested section empty.
- Infer sensible details from the subject, environment and action.
- Do not invent irrelevant objects, people or events.
- Respect the user's duration and aspect ratio.
- Keep the main subject consistent throughout the shot.
- Describe realistic physics and continuous motion.
- Make the result directly copyable into an AI video generator.
- Do not explain your reasoning.
- Do not use a table.

CAMERA:
Turn camera inputs into a complete cinematic setup.
Specify shot type, camera position, angle, movement, framing, subject
tracking, lens/focal length when useful, depth of field and focus behavior.
If the user gives only "tracking shot", expand it into a specific tracking
shot instead of repeating those two words.

LIGHTING:
Turn simple lighting inputs into a complete lighting design including
practical sources, key/fill/rim light when relevant, reflections, shadows,
contrast and exposure.

ENVIRONMENT:
Build believable foreground, middle-ground and background depth using only
details that naturally belong to the location.

ACTION:
Describe how the action starts, develops and ends within the requested
duration, including realistic movement and interaction with the environment.

MOTION & ATMOSPHERE:
Include appropriate environmental movement, camera motion, reflections,
particles, weather, clothing/hair movement, vehicle motion or other
physically relevant details. Do not add details that do not fit the scene.

AUDIO:
Always create appropriate audio even when the user leaves the field blank.
For vehicles, consider engine, tire, road and traffic sounds.
For people, consider footsteps, clothing and environmental ambience.
For food, consider cooking and kitchen ambience.
For nature, consider wind, water, birds and environmental ambience.
For products, use subtle premium commercial sound design.
Never say audio is unspecified.

SUBJECT-SPECIFIC CINEMATOGRAPHY:

SPORTS CAR / AUTOMOTIVE:
Use premium automotive-commercial cinematography. Consider low-angle
tracking, front three-quarter framing, realistic wheel rotation,
tire-road interaction, acceleration, suspension movement, reflections,
bodywork highlights, road spray when appropriate, engine sound and traffic.

PERSON:
Use natural body movement, realistic facial expression, clothing and hair
physics, consistent anatomy and identity.

PRODUCT:
Use premium commercial presentation, material details, controlled lighting,
reflections and smooth product-focused camera movement.

FOOD:
Use appetizing macro cinematography, realistic texture, steam and
appropriate cooking or serving sounds.

LANDSCAPE:
Use atmospheric depth, natural environmental movement, weather,
vegetation, water and natural light.

CHARACTER:
Maintain consistent face, body proportions, clothing, hairstyle and
accessories throughout the video.

MASTER PROMPT:
Write one polished paragraph that combines the subject, environment,
action, camera, lighting, visual style, motion, atmosphere, audio and
technical quality.

OUTPUT EXACTLY IN THIS STRUCTURE:

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

Every section must contain specific, useful information.
`;

    const response = await fetch(
      "https://router.bynara.id/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "auto/bynara",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userInput },
          ],
          temperature: 0.85,
          max_tokens: 4000,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("NaraRouter API error:", data);
      return Response.json(
        {
          error:
            data?.error?.message ||
            "NaraRouter API request failed.",
        },
        { status: response.status }
      );
    }

    const generatedText =
      data?.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      return Response.json(
        { error: "AI returned an empty response." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      prompt: generatedText,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return Response.json(
      { error: "Something went wrong while generating the prompt." },
      { status: 500 }
    );
  }
}
