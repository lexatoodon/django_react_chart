from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
import requests
from datetime import date
from bs4 import BeautifulSoup as Bs
from django.conf import settings
import re

def check_values(value: list):
    v1 = re.compile(r'\d{7}')
    v2 = re.compile(r'\d+')
    v3 = re.compile(r"^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$")
    v4 = re.compile(r"([0-1]?)")
    if re.match(v1, value[0]) and re.match(v2, value[1]) and re.match(v3, value[2]) and re.match(v4, value[3]):
        return True
    else: 
        print(value)
        return False

def getRuble():
    today = date.today().strftime(r'%d/%m/%Y')
    response = requests.get(f"https://www.cbr.ru/scripts/XML_daily.asp?date_req={today}")
    soup = Bs(response.content, features='xml')
    ruble = soup.find("Valute", attrs={"ID":"R01235"})
    formatted_ruble = float(ruble.find("Value").string.replace(',', '.'))
    return formatted_ruble

def getValues():
    try:
        creds = service_account.Credentials.from_service_account_file(
            settings.SERVICE_ACCOUNT_FILE, scopes=settings.SCOPES)
    except:
        creds = None
    if creds != None:   
        try:
            service = build('sheets', 'v4', credentials=creds)

            # Call the Sheets API
            sheet = service.spreadsheets()
            result = sheet.values().get(spreadsheetId=settings.SAMPLE_SPREADSHEET_ID,
                                        range=settings.SAMPLE_RANGE_NAME).execute()
            data = result.get('values', [])

            if not data:
                return None
            
            # adding new element price_ruble that populates from price_dollar * ruble 
            values = []
            ruble = getRuble()
            for i in data:
                if check_values(i):
                    i.insert(2, round(int(i[1])*ruble, 3))
                    values.append(i)
            return values
        except HttpError as err:
            raise err
    return None

