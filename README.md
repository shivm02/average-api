# Average API

`POST /average` accepts a number and returns the average of every number received so far.

## Setup
```bash
npm install      # also installs Git hooks (husky) when inside a git repo
npm start        # http://localhost:3000  (PORT env var to change)
npm test
```

## API
`POST /average` with `{ "number": 10 }` returns `{ "average": 10, "count": 1 }`.
Invalid input returns `400` with `{ "error": "..." }`.

```bash
curl -X POST localhost:3000/average -H 'Content-Type: application/json' -d '{"number": 10}'
```

## CLI client
```bash
npm run client -- 10 20 30
# sent 10 -> average 10 (count 1)
# sent 20 -> average 15 (count 2)
# sent 30 -> average 20 (count 3)
```
Set `API_URL` to target another host.

## Git hooks (husky)
- `commit-msg`: enforces Conventional Commits via commitlint (e.g. `feat: add average endpoint`).
- `pre-commit`: runs the test suite.

## Note
State is in memory, so the average resets when the server restarts.
