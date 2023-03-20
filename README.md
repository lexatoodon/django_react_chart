### Main commands: </br>
`docker-compose up -d --build ` </br>
`docker-compose exec backend python manage.py migrate ` #First run </br>
`docker-compose down`

[Spread sheet sample](https://snipboard.io/BVJi27.jpg)<br/>
### At Google cloud
- Create __Service Account__
- Add spread sheet API
- Give access to spread sheet for __Service Account__
- Create `token.json` and move to dj_chart/
### Add in settings.py:
- Google API:
  - SAMPLE_SPREADSHEET_ID
- Telegram
  - CHAT_ID
  - TELEGRAM_TOKEN
