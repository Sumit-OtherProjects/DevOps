import xml.etree.ElementTree as ET
import os, random, csv
from glob import glob

class XMLParser:
	def __init__(self, root, xmlDict, count):
		self.root = root
		self.xmlDict = xmlDict
		self.count = 1


	def perf_func(self,elem, elem_path=""):
		global xmlObj, testCaseNames, count, old
		case = ""
		testcase = ""
		testName = ""
		failedSince = ""
		for child in elem.getchildren():
			if child.getchildren() and child.text:

				xmlObj.perf_func(child, "%s/%s" % (elem_path, child.tag))
			else:
				if "case" in elem_path:
					if child.tag == "className":
						#print child.tag + child.text
						testcase = child.text
					if child.tag == "testName":
						#print child.tag + child.text
						testName = child.text
					if child.tag == "failedSince":
						#print child.tag + child.text
						failedSince = child.text
			if testcase != "" and failedSince != "" and testName != "":
				item = testcase+":"+testName
				if item not in testCaseNames and failedSince == "0" and item not in old:
					testCaseNames[item] = 1

				if item in testCaseNames and failedSince != "0":
					testCaseNames.pop(item)
				if item not in old and failedSince != "0":
					
					old.append(item)
					#testCaseNames.append(child.text)
				#if child.tag == "failedSince" and child.text == "0":
					#count += 1
					#print count
				#print "elem path ", elem_path, "child tag ", child.tag, "child text ",child.text
				#print "%s/%s, %s" % (elem_path, child.tag, child.text)
			#else:
				



path = str(os.path.dirname(os.path.realpath(__file__)))

z = glob(path +"/build_logs/buildscopy/*/")
xmlDict = {}


#print len(z)
file = 0
count = 0
testCaseNames = {}

old = []
for i in range(len(z)):
	file += 1
#print file
for j in range(1, file+1):
	if j <=100:
	    try:
	    	#print j
	    	count = 0
	    	
	    	path = str(os.path.dirname(os.path.realpath(__file__)))
	    	tree = ET.parse(path+"/build_logs/buildscopy/"+str(j)+"/junitResult.xml")
	        root = tree.getroot()
	        #print z[i]
	        
	    except:
	    	pass
	    xmlObj = XMLParser(root, xmlDict, 1)
	    xmlObj.perf_func(root, root.tag)
	    #print j," ",len(testCaseNames)
	    file = open(path+"/build_logs/buildscopy/"+str(j)+"/useless.txt",'w')
	    file.write('Test Report of Analyzing Useless Test Cases\n')
	    file.write('Current Build Number: '+str(j)+'\n')
	    file.write('Number of Builds Checked Before This: '+str(j-1)+'\n')
	    file.write('Number of Useless TestCases: '+str(len(testCaseNames)))
	    file.write('\nList of Useless Testcases\n------------------------------------------------\n')
	    for k, v in testCaseNames.items():
			file.write(k+'\n')

	
