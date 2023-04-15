"""
this script takes all the tools, and creates a list of them
"""
import os,sys

template = open("index.template.html").read()

tools = []

def findtools():
    tooldirs = []
    toolpaths = []
    for root,dirs,files in os.walk("."):
        for dir in dirs:
            tooldirs.append(os.path.join(root,dir))
        break
    for dir in tooldirs:
        if os.path.isfile(os.path.join(dir,"index.html")):
            toolpaths.append(os.path.join(dir,"index.html"))
        elif os.path.isfile(os.path.join(dir,"tool.html")):
            toolpaths.append(os.path.join(dir,"tool.html"))
    return toolpaths

def genlinks(urls):
    endresult = ""
    for url in urls:
        endresult += "<li><a href=\"{}\">{}</a></li>\n".format(url,url)
    return endresult

toolsindex = """<ul>
{}
</ul>""".format(genlinks(findtools()))

outindex = open('index.html','w')
outindex.write(template.replace("{{TOOLS}}",toolsindex))
outindex.close()