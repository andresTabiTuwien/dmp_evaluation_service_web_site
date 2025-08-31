# API

## Evaluate
**POST** `{{ config.extra.api_base_url }}/api/evaluate`

- JSON: `{ "text": "<dmp-text>" }`
- Multipart: `file` (and/or `text`)

### Example response
```json
{
  "score": 0.82,
  "grade": "B+",
  "issues": [
    {"section":"Data Storage","severity":"high","message":"No backup policy."}
  ],
  "summary": "Solid plan with a few gaps."
}
