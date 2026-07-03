from random import randrange
def Rand_Int():
    if randrange(1,6) ==  5: #this makes big numbers more rare
        x = randrange(5,17)
    else:
        x = randrange(1,8)
    match randrange(1,3):
        case 1:
            return x
        case 2:
            return x * -1
def Rand_Low_Int():
    x = randrange(1,6)
    match randrange(1,3):
        case 1:
            return x
        case 2:
            return x * -1


def stringify(val):
    if val == 1:
        return "+ "
    elif val == -1:
        return "- "
    elif val < 0:
        return f"- {val * -1}"
    else:
        return f"+ {val}"
#coefficients
first_var = Rand_Low_Int()
second_var = Rand_Low_Int()
third_var = Rand_Low_Int()
#solutions
first_sol = Rand_Int()
second_sol = Rand_Int()
third_sol = Rand_Int()

total_val = (first_var * first_sol) + (second_var * second_sol) + (third_var * third_sol)


equations = []

count = 0
while count != 3:
    first_var = Rand_Low_Int()
    second_var = Rand_Low_Int()
    third_var = Rand_Low_Int()
    total_val = (first_var * first_sol) + (second_var * second_sol) + (third_var * third_sol)
    first_var = "" if first_var == 1 or first_var == -1 else first_var # "x" instead of "1x" "its just proper yk"
    equations.append(f"{first_var}x {stringify(second_var)}y {stringify(third_var)}z = {total_val}")
    count += 1

print (f"""
|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
|_|_|                 |_|_|_|
|_|_|{"Equations":^17}|_|_|_|
|_|_|                 |_|_|_|
|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
|_|_|                   |_|_|
|_|                       |_|
""",end="")
print ("|_|",end="")
for i in equations:
    print (f"{i:^23}|_|",end="\n|_|")
print ("                       |_|",end="")
print ("""
|_|_|                   |_|_|
|_|_|_|_|_|_|_|_|_|_|_|_|_|_|
""")

print (f"""
|_|_|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|_|_|                           Daniel was here
|_|_|           |_|_|
|_|_| Solutions |_|_|
|_|_|           |_|_|
|_|_|_|_|_|_|_|_|_|_|
|_|_|_|_|_|_|_|_|_|_|
|_|_| {"x="+str(first_sol):^10}|_|_|
|_|_| {"y="+str(second_sol):^10}|_|_|
|_|_| {"z="+str(third_sol):^10}|_|_|
|_|_|_|_|_|_|_|_|_|_|
""",end="")
