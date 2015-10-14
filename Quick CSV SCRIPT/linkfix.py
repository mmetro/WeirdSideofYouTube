import os
import csv

reader = csv.reader(open('links.csv'),delimiter=',')
writer = csv.writer(open('writer.csv', 'w'),delimiter=',')
count = 0
for row in reader:
        link = row[-1]
        #print link
        itr1 = 0
        itr2 = 0
        start = 0
        end = 0
        lst = [None] * 250
        while(itr1 + 1 < len(link)):
                if (link[itr1] == 'v' and link[itr1 + 1] == "="):
                        start = itr1 + 2
                if (link[itr2] == "&" and end == 0):
                        end = itr2
                itr1 = itr1 + 1
                itr2 = itr2 + 1
        if (end == 0):
                end = len(link) - 1
        output = link[start:end]
        print output
        itr1 = 0
        found = False;
        #n^2 but w/e
        while (itr1 < count):
                if (output == lst[itr1]):
                        found = True
                        print "gotcha"
                        break
                itr1 = itr1 + 1
        if (found == False):
                lst[count] = output
                count = count + 1
                test = "test"
                writer.writerow([output, link])

print count
#writer.close()
