#    b62ff8b5ba474590a315f5550ba205ef
#    hqVWtqMQqviP9De2g8zi5xUXkYO1PSkBHu5J79ipFrzmKYa0VZy8ASDFu5V0Uukx
#    epsonhacktrek04@print.epsonconnect.com
import requests
import json
import os
import pdfkit


def email_to_get_token(printer_email="epsonhacktrek04@print.epsonconnect.com"):
    base_url = "https://api.epsonconnect.com/api/1/printing/oauth2/auth/token?subject=printer"  # const
    CLIENT_ID = "b62ff8b5ba474590a315f5550ba205ef"  # const
    SECRET_PASS = (
        "hqVWtqMQqviP9De2g8zi5xUXkYO1PSkBHu5J79ipFrzmKYa0VZy8ASDFu5V0Uukx"
    )  # const

    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
    params = {
        "grant_type": "password",
        "username": printer_email,
        "password": "",
    }
    res = requests.post(
        base_url, data=params, headers=headers, auth=(CLIENT_ID, SECRET_PASS)
    )
    if res.status_code != 200:
        return 0
    else:
        di = json.loads(res.text)
        return di["access_token"], di["subject_id"]


token, print_id = email_to_get_token()
print(token, print_id)


def decide_photo_or_doc_and_get_url(
    TF, token, print_id
):  # trueならpdf,falseならdocument
    jpgORpdf = ["photo", "document"][TF]

    job_name = "___"
    access_token = token
    printer_id = print_id
    base_url = (
        "https://api.epsonconnect.com/api/1/printing/printers/"
        + printer_id
        + "/jobs"
    )
    headers = {
        "Authorization": "Bearer " + access_token,
        "Content-Type": "application/json; charset=utf-8",
    }
    obj = {"job_name": "password", "print_mode": jpgORpdf}
    json_data = json.dumps(obj).encode("utf-8")
    res = requests.post(base_url, data=json_data, headers=headers)
    if res.status_code != 201:
        return 0
    else:
        di = json.loads(res.text)
        return di["id"], di["upload_uri"]


j_id, url = decide_photo_or_doc_and_get_url(1, token, print_id)
print(j_id, url)


pdfkit.from_url("http://www.tohoho-web.com/python/function.html", "1.pdf")

file_path = "./1.pdf"
file_name = "1.pdf"
uri = url
base_url = uri + "&File=" + file_name
file_size = os.path.getsize(file_path)
headers = {
    "Content-Length": str(file_size),
    "Content-Type": "application/octet-stream",
}
file = {"upload_file": open(file_path, "rb")}
res = requests.post(base_url, files=file, headers=headers)
print(res.status_code)  # 成功コード200
print(res.text)


printer_id = print_id
job_id = j_id
access_token = token
uri = (
    "https://api.epsonconnect.com/api/1/printing/printers/"
    + printer_id
    + "/jobs/"
    + job_id
    + "/print"
)

headers = {
    "Authorization": "Bearer " + access_token,
    "Content-Type": "application/json; charset=utf-8",
}
res = requests.post(uri, headers=headers)

print(res.status_code)
print(res.text)  # 成功コード200
