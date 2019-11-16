import pdfkit


def create(name):
    pdfkit.from_url("http://google.com", "%f.pdf" % name)
    return
