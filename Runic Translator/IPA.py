import eng_to_ipa as p
import ast


# dict.txt >> out.txt
# words = []
# text = open("dict.txt","r")
# l = "balls"
# while l:
#     l = text.readline()
#     l = l[:-1]
#     print(l + " : ", end="")
#     print(p.ipa_list(l)[0])


# out.txt >> out2.txt
# text = open("out_new.txt", "r")
# l = "balls"
# while l:
#     l = text.readline()
#     if("*" not in l):
#         print(l,end="")

# find all phonetic letters
# text = open("out_new2.txt","r")
# l = "balls"
# t = []
# alph = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","[","]",",","\"","\n"," ",":","ʧ","ʤ","ŋ","ʃ","θ","ð","ʒ"]
# while l:
#     l = text.readline()
#     l = [*l]
#     x = [i for i in l if i not in alph and i not in t]

#     for i in x:
#         t.append(i)
# print(t)

# convert converts.js >> out3.js
text = open("converts.js", "r")
l = text.readline()
while l:
    l = text.readline()
    if l == "];":
        break
    before = ast.literal_eval(l)
    if len(before[1]) > 1:
        for i in before[1]:
            print("[\"" + before[0] + "\", \"" + i + "\"],")
    else:
        print("[\"" + before[0] + "\", \"" + before[1][0] + "\"],")

