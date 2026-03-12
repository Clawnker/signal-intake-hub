# signal-intake-hub spec (v0)

## Intake item schema
- id
- sourceType
- sourceUrl/rawText
- capturedAt/capturedBy
- tags[]
- normalized metadata

## Analysis packet schema
- executiveSummary
- strategicFit
- opportunities[]
- risks[]
- unknowns[]
- recommendation
- confidence

## Delivery schema
- channelId
- threadId
- messageId
- postedAt

## Pipeline stages
- captured -> normalized -> analyzed -> delivered -> tracked
