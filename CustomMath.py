def factorial(x: int) -> int:
    a = 1
    for i in range(1,x+1):
        a*=i
    return a


def numerize(x: any) -> any:
    """
    returns string input in integer type if possible
        if not then in float type
        if not that then just left as is

        notice: not made for complex class due to the ambguitiy of the presence of "j"
    """
    try:
        x = float(x)
    except:
        return x #if it cant even be converted to a float then it aint numeric
    if int(x) == float(x):
        return int(x)
    else:
        return float(x)
        

def pi_reducer(x) -> float:
    pi = 3.1415926535 #approx
    while x >= 2*pi:
        x-=2*pi
    return x

def sine(x,n=50) -> float:
    ## at approximately 8 digit accuracy rn
    x = pi_reducer(x)
    index = 3
    sign = -1 #1 = postive, -1 = negative
    result = x
    for _ in range(n):
        exponent = x**index
        expression = exponent/factorial(index)
        final_expression = sign * expression
        result += final_expression
        #next iteration config
        index += 2
        sign *= -1
    return result

def cosecant(x,n=50) -> float:
    return (1/sine(x,n))

def sine_method_for_pi(accuracy=10000) -> float:
    radian_converter = (3.14159265359/180) # we need pi for the radian conversion, ik its a bit circular reasoning
    degree_input = (180/accuracy) * radian_converter
    return (accuracy * sine(degree_input))
def arctan(x,n=1000000) -> float:
    #approx 6-7 digit accuracy
    if not (-1<=x<=1):
        """
        use co function  identity:
        arctan (x) = pi/2 - arctan(1/x)

        to reduce x value to fit valid convergence domain
        """
        pi = 3.1415926535
        try:
            return (pi/2 - arctan(1/x))
        except:
            raise(ValueError("Invalid dominan: arctan input is between -1 and 1"))
    index = 3
    sign = -1 #1 = postive, -1 = negative
    result = x
    match x:
        case -1:
            for _ in range(n):
                expression = -1/index
                final_expression = sign * expression
                result += final_expression
                #next iteration config
                index += 2
                sign *= -1
        case 1:
            for _ in range(n):
                expression = 1/index
                final_expression = sign * expression
                result += final_expression
                #next iteration config
                index += 2
                sign *= -1
        case _:
            for _ in range(n):
                exponent = x**index
                expression = exponent/index
                final_expression = sign * expression
                result += final_expression
                #next iteration config
                index += 2
                sign *= -1

    
    return result

def arctan_method_for_pi(n=1000000) -> float:
    #default output: 3.1415936535887745
    return (arctan(1,n) * 4)
    # 6 digits from 100,000
    # 8 digits from 500 million

def approximate(x):
    return round(x,5)

def DerivitaveAtPoint(func,x,h=0.000000001) -> float:
    return (func(x+h) - func(x))/h


def golden_ratio(depth: int) -> float:
    #depth of 40 means 15 digit accuracy
    a = 0
    b = 1
    for _ in range(depth):
        a,b = b,a + b
    return b/a


def factors(x: int) -> list[list]: 
    results = []
    for i in range(1,round(x**0.5)+1):
        if x % i == 0:
            results.append([i,numerize(x/i)])
    return results


def isPrime(x: int) -> bool:
    if x <= 1:
        return False
    for i in range(2,round(x**0.5)+1):
        if x % i == 0:
            return False
    return True


def isComposite(x: int) -> bool:
    for i in range(2,round(x**0.5)+1):
        if x % i == 0:
            return True
    return False


def reimann_integral(func,lower_bound,upper_bound,orientation: int,h=0.0005) -> float:
    """
    numerically evaluates the given function with specified orientation type

    orientation types:
    1. left (fast general)
    2. right (fast general)
    3. midpoint (general)
    4. trapezoidal (linear)
    5. simpson (curves)
    """
    match orientation:

        case 1:
            sum = 0
            negative_integral = False
            if lower_bound > upper_bound:
                lower_bound,upper_bound = upper_bound,lower_bound #swap if wrong order detected
                #iteration method requires correct order
                negative_integral = True #still accounts for negativity
            elif lower_bound == upper_bound:
                return 0
            while lower_bound < upper_bound:
                sum += (func(lower_bound)*h)
                lower_bound += h
            return sum if not negative_integral else -sum #not negative integral is the more common case
        
        case 2:
            sum = 0
            negative_integral = False
            if lower_bound > upper_bound:
                lower_bound,upper_bound = upper_bound,lower_bound
                negative_integral = True
            elif lower_bound == upper_bound:
                return 0
            while lower_bound < upper_bound:
                lower_bound += h
                sum += func(lower_bound) * h
            return sum if not negative_integral else -sum
        
        case 3:
            sum = 0
            negative_integral = False
            if lower_bound > upper_bound:
                lower_bound,upper_bound = upper_bound,lower_bound
                negative_integral = True
            elif lower_bound == upper_bound:
                return 0
            while lower_bound < upper_bound:
                midpoint = lower_bound + (h/2)
                sum += func(midpoint) * h
                lower_bound += h
            return sum if not negative_integral else -sum
        
        case 4:
            sum = 0
            negative_integral = False
            if lower_bound > upper_bound:
                lower_bound,upper_bound = upper_bound,lower_bound
                negative_integral = True
            elif lower_bound == upper_bound:
                return 0
            while lower_bound < upper_bound:
                trap_line = (func(lower_bound) + func(lower_bound+h))/2
                sum += trap_line * h
                lower_bound += h
            return sum if not negative_integral else -sum
            
        case 5:
            sum = 0
            negative_integral = False
            if lower_bound > upper_bound:
                lower_bound,upper_bound = upper_bound,lower_bound
                negative_integral = True
            elif lower_bound == upper_bound:
                return 0
            while lower_bound + 2*h <= upper_bound:
                parabola_area = (func(lower_bound) + func(lower_bound+h)*4 + func(lower_bound + 2 * h)) * (h/3)
                sum += parabola_area
                lower_bound += 2 * h
            #handle any left overs less than 2 * h
            #using trapezoidal rule
            while lower_bound < upper_bound:
                h = min(h,upper_bound-lower_bound)
                trap_line = (func(lower_bound) + func(lower_bound+h))/2
                sum += trap_line * h
                lower_bound += h
            return sum if not negative_integral else -sum
        
        case _:
            raise TypeError("integer between 1-5 expected for integral orientation type")
        
            

def cosine(x,n=50) -> float:
    # approx 15-16 digit accuracy
    x = pi_reducer(x)
    index = 2
    sign = -1
    result = 1
    for _ in range(n):
        result += sign * (x**index)/factorial(index)
        index += 2
        sign *= -1
    return result

def tan(x,n=50) -> float:
    return (sine(x,n)/cosine(x,n))

def cot(x,n=50) -> float:
    return (cosine(x,n)/sine(x,n))

def secant(x,n=50) -> float:
    #approx 15 decimal digit accuracy
    return (1/cosine(x,n))

def combination(x,y):
    "formula = n! divded by (k! * (n-k)!)"
    
    #example case: 10, 5
    if y == 0 or x==y:
        return 1
    if x>y:
        
        uncommon_products = range((1+(x-y)),x+1) # 10! -> 5! * 6 * 7 * 8 * 9 * 10
        uncommon_numerator = 1
        for i in uncommon_products:
            uncommon_numerator *= i
        return uncommon_numerator//factorial(y)
    else: #x<y
        raise ValueError("second term(y) cannot be more than first term(x)")

def arcsin(x,n=150):
    #around the edges is not recommended lol
    match x:
        case 1:
            return 1.570796326794896
        case -1:
            return -1.570796326794896
    if not (-1<=x<=1):
        raise(ValueError("Invalid dominan: arcsin input is between -1 and 1"))
    result = 0
    for i in range(n):
        comb = combination(2*i,i)
        denominator_1 = 4**i
        denominator_2 = (2*i + 1)
        denominator_3 = x**-(2*i + 1)
        denominator = denominator_1 * denominator_2 * denominator_3
        result += comb/denominator
    return result


def permutations(x,y):
    "formula = n! divded by (n-k)!"
    "we split n! into n-k! * (k*k+1*k+2...n)"
    "allowing us to cancel n-k on both sides, leaving us the product of all those uncommon factors"
    if y == 0 or x==y:
        return 1
    uncommon_products = range((1+(x-y)),x+1) # 10! -> 5! * 6 * 7 * 8 * 9 * 10
    uncommon_numerator = 1
    for i in uncommon_products:
        uncommon_numerator *= i
    return uncommon_numerator

def arccos(x,n=150):
    pi = 3.1415926535
    return (pi/2 - arcsin(x,n))

def e_exp_taylor(x,n=150):
    e = 2.718281828459045
    match x:
        case 0:
            return 1
        case 1:
            return e
    result = 0
    for i in range(n):
        result += (x**i)/(factorial(i))
    return result

def e_exp_eval(x):
    e = 2.7182818284590452353602
    return e**x



def eix(x,n=50):
    return (cosine(x,n) + sine(x,n)*1j)

def ln_taylor(x,n=200):
    """
    THIS IS A SUB FUNCTION. NOT TO BE USED ON ITS OWN
    """
    if x == 0:
        raise ZeroDivisionError("ln(0) is undefined")
    #configure input
    x  -= 1
    #initlaize vars
    result = x
    index = 2
    sign = -1
    for _ in range(n):
        exoponential = x**index
        divisor = 1/index # through reciprocal multiplication
        term = exoponential * divisor * sign
        result += term
        index += 1
        sign *= -1
    return result * 2 #cuz thats the identity

def ln_arctanh_taylor(x,n=200) -> float:
    """
    THIS IS A SUB FUNCTION. NOT TO BE USED ON ITS OWN

    best for 0.05 < x < 35

    no higher than 39
    no lower than 0.02

    its way worse if its too low

    the ln convergence expansion algorithim keeps it within its optimal range anyway
    """
    if x <= 0:
        raise ValueError("invalid domain for the arctanh definition on ln(x)")
    elif abs(x-1) < 1e-10: #checks if input is within 1e-10 of 1, then assumes the input is 1 if so
        return 0.0
    #configure input
    hyperbolic_x = (x-1)/(x+1)
    #check for bad inputs
    if abs(x) < 0.05 and abs(x-1) > 0.01:
        #check 1 ensures hyperbolic x isnt too close to zero
        #check 2 ensures x isn't too close to 1, cuz infinite rercursion on the reciproral would occur since 1**-1 = 1
        return -ln_arctanh_taylor(1/x) #my favorite log identity
    #initalize vdalues
    result = hyperbolic_x
    index = 3
    #factor = reciproocal of index
    for _ in range(n):
        exponentiation = hyperbolic_x**index
        reciprocal_factor = 1/index # not index**-1 cuz 1/index is slightly faster
        final_term = reciprocal_factor * exponentiation
        result += final_term
        #next iter config
        index += 2
    return result * 2



def ln(x,n=200) -> float:
    """
    computes natural log of x using arctanh taylor series and a log expansion algoithim

    features:
    convergence optimization
    large input simplification in terms of modulus * 5000**x
    small input optization through reciprocation

    """
    # EDIT #
    # BIG INPUT HANDLER #
    def ln_reducer(x) -> float: # for value reduction NOT for accuracy
        
        #determine how many parts to cut value into
        #we want all inputs to be <5000
        
        
        ALLOWED = True
        #but i also have to decide if using one precomputed value is cheating or not
        #cuz the whole point of this module was using arbituary operations without any "cheating"
        #set ALLOWED to false if you wanna run the code without having the precomputed value of ln(5000)
        #it'll stil find it, just takes a little while longer
        #decent difference in the seconds of time. one precomputed value can make a massive difference
        ln5000_val = 8.517193191416238211235100 if ALLOWED else ln(5000)
        parts = x//5000
        reducible = parts * 5000
        ln_reducible = ln5000_val + ln(parts)
        return ln(x/reducible) + ln_reducible
        
    if x > 5000:
        return ln_reducer(x)

    def ln_expansion(x: list) -> list: #for accuracy NOT for value reduction
        """
        expected input is a list of ints/floats that of which are all less than 2
        EXCEPT the last one which will be reduced by adding another terms into the list
            so heres a full case of the expansion algorithim:
        ln(5) -> ln(5) is selected because 5-1 > 1
        ln(5/4) + ln(4)
        ln(5/4) + ln(4/3) + ln(3)
        ln(5/4) + ln(4/3) + ln(3/2) + ln(2)
        ln(5/4) + ln(4/3) + ln(3/2) + ln(2)
        ln(2),the end case, will be customly converted into ln(9/8) + 2ln(4/3)
        """
        while x[-1] > 2:
            divsor = x[-1] - 1
            x.append(divsor)
            x[-2] = (x[-2])/divsor
        x.pop(-1)
        x.append(9/8)
        x.append(4/3)
        x.append(4/3)
        #that part replaces the base case of ln(2) with ln(9/8) + 2ln(4/3)
        return x
    ln_sum = []
    x = numerize(x)
    match x:
        case float():
            if abs(x) > 2:
                a = x//2
                b = a*2
                c = x/b
                ln_sum = [c,b] #initial sequence
                ln_sum = ln_expansion(ln_sum) #sequence continuation
            else: # |x| < 2
                if 1/x >= 2: #aka X <= 1/2
                    return -ln(1/x)
                else: # x is more than one half
                    #multiply by 4 to ensure x is at least 2
                    #then we apply correspondinglog property by subtracting by ln(4)
                    return ln(x*4) - ln(4)
        case int():
            match x:
                case 0:
                    raise ZeroDivisionError("ln(0) is undefined")
                case 1:
                    return 0.0
            #base cases 0,1 are handled
            if x != 2: #only applies for non base case
                a = x//2
                b = a*2
                c = x/b
                ln_sum = [c,b] #initial sequence
            else: #base case 2 fallback
                ln_sum = [2] #initial sequence (not thats theres much to continnue)
            ln_sum = ln_expansion(ln_sum) #sequence continuation
        case complex():
            complex_info = polar_form(x,1)
            modulus = complex_info[0]
            theta = complex_info[1]
            return [ln(modulus),ln(theta) * 1j]
        case _:
            raise TypeError(f"invalid input: {x}")
    #ln evaluation time
    evaluated_list = [ln_arctanh_taylor(i,n) for i in ln_sum]
    answer = sum(evaluated_list)
    if abs(answer-1) < 1e-13:
        return 1.0
    else:
        return answer
def a_log(x,a=10,n=200) -> float:
    #little too simple to rlly comment on
    return (ln(x,n)/ln(a,n))

def polar_form(x: complex,output_type = 1):
    """
    Returns polar form of given complex number

    Input types:
    1. Returns list containing both variables
    ex: [5,0.927] - this means the modulus = 5 and theta is approx 0.927
    
    2. Returns literal string that can be mathematically evaluated
    ex: 5*(e**(0.927j)) as filled: r*e^(i*theta)
    """
    #first find modulus(abs value) of complex number
    #yes im aware its a built in feature but thats no fun

    modulus = ((x.imag)**2 + (x.real)**2)**0.5
    modulus = numerize(modulus)

    theta = arctan(x.imag/x.real) * 1j
    theta = numerize(theta)

    match output_type:
        case 1: # string output
            return f"{modulus}*(e**({theta}))"
        case 2: # list output
            return [modulus,theta]
        case _:
            raise ValueError("invalid output type")


def a_root(x,a=2,n=200):
    match x<0:
        case True:
            result = e_exp_eval(ln(-x,n)/a)
            validated_result = validate_round2(result)
            if validate_round2(result**a) == -x:
                return result * 1j
            else:
                return validated_result * 1j
        case False:
            result = e_exp_eval(ln(x,n)/a)
            validated_result = validate_round2(result)
            if validate_round2(result**a) == x:
                return result
            else:
                return validated_result


def validate_round2(actual,SENSITIVITY=4) -> any:
    """
    input a number to be approximated if possible by leading 9's or 0's(sensitivity arg)
    intended for detecting floating point errors

    sensitivity is more of an index rather than a simple count for leading zero amounts

    NEW VERSION - ATTEMPTS TO DETECT CASES IN WHICH USER EXPECTS AN OUTPUT OF LEADING ZEROS/NINES - EXPECTED CASE
    barely any false positives with leading nines
    mild false positivies with leading zeros, since zero floating point errors are identical to EXPECTED CASES
    leading zero false positives cannot be accounted for without knowing the context of the number.
    which this function attempts to be able to work without
    """

    if actual < 0:
        return -validate_round2(-actual)
    #cuz the "<"  in the floor/ceiling rounding logic gets messed up
    #the most program efficient fix was realizing that rounding itself is an odd function by definition
    #odd function ---> -f(x) = f(-x)
    if isinstance(actual,complex):
        return complex(real=validate_round2(actual.real),imag=(validate_round2(actual.imag)))
    #attempt round down
    floor = int(actual)
    if actual - floor < (10**-(SENSITIVITY+3)):
        return floor
    
    #attempt round up
    ceiling = int(actual + 1)
    if ceiling - actual < (10**-(SENSITIVITY+3)):
        return ceiling
    
    
    try:
        str_list = list(str(actual))
        start = str_list.index(".")
    except:
        return numerize(actual) #cant detect a floating error if it aint a float.
    

    # floating zeros check
    def zero_check(actual):
        str_list = list(str(actual))
        counter = 0
        for i in range(start,len(str_list)):
            if str_list[i] == "0":
                counter += 1
            else:
                if counter > SENSITIVITY-2:
                    for j in range(i,len(str_list)):
                        str_list[j] = "0"
                    return numerize("".join(str_list)) #if floating zeros detected a floating nine check is
                counter = 0
        return "".join(str_list)
    
    # floating 9s check
    def nine_check(actual):
        str_list = list(reversed(str(actual)))
        counter = 0 #counts current amount of nines
        for i in range(len(str_list)):
            if str_list[i] == "9":
                counter += 1
            else:
                if counter > SENSITIVITY-1 and str_list[i] != ".":
                    str_list[i] = str(int(str_list[i]) + 1)
                    for j in range(i):
                        str_list[j] = "0" if str_list[j] != "." else "." #this if statement prevents the period from being replaced with a zero
                    return numerize("".join(reversed(str_list)))
                counter = counter if str_list[i] == "." else 0
        return "".join(reversed(str_list))
    SENSITIVITY_ZEROS = "".join(["0" for i in range(SENSITIVITY-1)])
    SENSITIVITY_NINES = "".join(["9" for i in range(SENSITIVITY)])
    try:
        zeros = True
        zero = (str(actual)).index(SENSITIVITY_ZEROS)
    except:
        zeros = False
        zero = len(str(actual)) + 2
    try:
        nines = True
        nine = (str(actual)).index(SENSITIVITY_NINES)
    except:
        nines = False
        nine = len(str(actual)) + 2
    if zero == nine: #this case means theres no leading zeros/nines meaning no floating point error detected
        return numerize(actual)
    elif zeros and nines: #ex 12.09999900001 {sensitivity = 4}
        if zero < nine:
            return numerize(nine_check(actual))
        else:
            return numerize(zero_check(actual))
    elif zero < nine:
        return numerize(zero_check(actual))
    else: #zero > nine
        return numerize(nine_check(actual))


    



def validate_round(actual,SENSITIVITY=4) -> any:
    """
    input a number to be approximated if possible by leading 9's or 0's(sensitivity arg)
    intended for usage to detect floating point errors

    OLDER VERSION - DOES NOT ACCOUNT FOR CASES IN WHICH USER EXPECTS AN OUTPUT OF LEADING ZEROS/NINES
    """

    if actual < 0:
        return -validate_round(-actual)
    #cuz the "<"  in the floor/ceiling rounding logic gets messed up
    #the most program efficient fix was realizing that rounding itself is an odd function by definition
    #odd function ---> -f(x) = f(-x)
    if isinstance(actual,complex):
        return complex(real=validate_round(actual.real),imag=(validate_round(actual.imag)))
    #attempt round down
    floor = int(actual)
    if actual - floor < (10**-(SENSITIVITY+1)):
        return floor
    
    #attempt round up
    ceiling = int(actual + 1)
    if ceiling - actual < (10**-(SENSITIVITY+1)):
        return ceiling
    
    # floating 9s check
    
    str_list = list(reversed(str(actual)))
    counter = 0 #counts current amount of nines
    for i in range(len(str_list)):
        if str_list[i] == "9":
          counter += 1
        else:
            if counter > SENSITIVITY and str_list[i] != ".":
                str_list[i] = str(int(str_list[i]) + 1)
                for j in range(i):
                    str_list[j] = "0" if str_list[j] != "." else "." #this if statement prevents the period from being replaced with a zero
            counter = counter if str_list[i] == "." else 0
    result = "".join(reversed(str_list))
    result = numerize(result)

    # floating zeros check

    str_list = list(str(result))
    try:
        start = str_list.index(".")
    except:
        return result #if its not a decimal then theres no float to check
    counter = 0
    for i in range(start,len(str_list)):
        if str_list[i] == "0":
            counter += 1
        else:
            if counter > SENSITIVITY:
                for j in range(i,len(str_list)):
                    str_list[j] = "0"
                #return numerize("".join(str_list))
                result = ("".join(str_list))
                break
            counter = 0
    return numerize(result)


def gcf(a,b):
    #euclidean algorithim implementation
    while(b):
        a, b = b, a % b
    return a
def gcf_list(array: list) -> any:
    """
    example input:
    [a,b,c,d,e,f]
    recursively split into nested subarrays of len 2
    iter 1 - [[a,b],[c,d],[e,f]]
    iter 2 - [   [[a,b] , [c,d]],    [e,f]    ]
    we now have 2 numbers
    gcf([a,b],[c,d]) and gcf(e,f)
    get the final gcf of those 2 numbers
    answer = gcf(gcf([a,b],[c,d]),gcf([e,f]))
    """
    match len(array):
        case 0:
            return None
        case 1:
            return array if not isinstance(array,list) else array[0]
        case 2:
            return gcf(array[0],array[1])
    counter = 0
    current_list_storage = []
    final_list = []
    for i in array:
        counter += 1
        current_list_storage.append(i)
        if counter == 2:
            final_list.append(current_list_storage)
            current_list_storage = []
            counter = 0
    if current_list_storage:
        current_list_storage.append(0)
        final_list.append(current_list_storage)
    return gcf_list([gcf(i[0],i[1]) for i in final_list])
def lcm(a,b):
    """
    if 0 is given, returns the other number.
    if both inputs are zero, returns zero
    """
    original_a = a
    a,b = abs(a),abs(b)
    if b > a:
        a,b = b,a
    if b == 0:
        return original_a
    return numerize((a*b)/gcf(a,b))
def lcm_list(array: list):
    match len(array):
        case 0:
            return None
        case 1:
            return array if not isinstance(array,list) else array[0]
        case 2:
            return lcm(array[0],array[1])
    counter = 0
    current_list_storage = []
    final_list = []
    for i in array:
        counter += 1
        current_list_storage.append(i)
        if counter == 2:
            final_list.append(current_list_storage)
            current_list_storage = []
            counter = 0
    if current_list_storage:
        current_list_storage.append(0)
        final_list.append(current_list_storage)
    return lcm_list([lcm(i[0],i[1]) for i in final_list])

def floor(x):
    return int(x-1) if x < 0 else int(x)
    
def ceiling(x):
    if int(x) == float(x):
        return int(x)
    else:
        if x < 0:
            return int(x)
        return int(x) + 1
def radify(degrees):
    """
    converts degrees input to radians
    """
    pi = 3.141592653589793238462643383279
    return degrees * (pi/180)
def degreeify(radians):
    """
    converts radian input to degrees
    """
    pi = 3.141592653589793238462643383279
    return radians * (180/pi)


def lanczos_gamma(z):
    # Coefficients for Lanczos approximation
    p = [
        0.99999999999980993,
        676.5203681218851,
       -1259.1392167224028,
        771.32342877765313,
       -176.61502916214059,
        12.507343278686905,
       -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ]
    if z == int(z) and z <= 0:
        raise ValueError("non positive integers are not defined in the gamma function")
    if z < 0.5:
        #Reflection formula (for small inputs)
        pi = 3.141592653589793238462643383279
        return pi / (sine(pi * z) * lanczos_gamma(1 - z))

    #lanczos sum
    z -= 1
    x = p[0]
    for i in range(1, len(p)):
        x += p[i] / (z + i)

    t = z + 7.5
    sqrt_two_pi = 2.5066282746310007    # sqrt(2pi)
    answer = sqrt_two_pi * (t ** (z + 0.5)) * e_exp_eval(-t) * x
    return answer


def gamma(x, error_round=True):
    """
    not fully accurate but pretty close
    uses lanczos approximation, reflection formula, and iterative input decomposition(for accuracy purposes)
    error_round arg attempts to round result to the decimal digit place in which inaccuracy begins
    """
    if x >= 172:
        raise OverflowError(f"{x} is outside the conventional gamma performance domain")
    if x < 2:
        result = lanczos_gamma(x)
    else:
        factor = 1
        while x > 2:
            x -= 1
            factor *= x
        result = lanczos_gamma(x) * factor

    if error_round:
        #rounds answer to expected accuracy range
        ROUND_AMT = 3
        result = round(result, len(str(result)) - 1 - (ROUND_AMT + len(str(int(result)))))
        return float(validate_round2(result))
    else:
        return result

def user_int_input(msg):
    """
    convenience function for testing
    repeatedly asks user for input until int is given
    int written as float does NOT count
    ex 5.0 will NOT be accepted as 5
    """
    while True:
        x = input(f"{msg}")
        try:
            x = int(x)
        except Exception as e:
            print (e,end="\n\n")
            continue
        break
    return x

def to_custom_base(start: int, base: int) -> str:
    """
    function works correctly with STRICTLY INTEGER TYPE, 
    Base must be a integer greater than positive one (int(x)>1), 
    numerically evaluated;16 does not mean hexadecimal_format, 
    appends base prefix if applicable in python syntax
    irreversible if base > 10
    """
    negativity = False
    if start < 0:
        negativity = True
        start = -start
    mods = ""
    while start >= base:
               mod = start % base
               start = start // base
               mods += f"{mod}"
    mods += f"{start}"
    prefixes = {
        2 : "0b",
        8 : "0o",
    }
    if base in [2,8]:
        mods += "".join(reversed(prefixes.get(base)))
    final_string = "".join(reversed(mods))
    return final_string if not negativity else "-" + final_string

def from_custom_base(start: str, base: int,prefix_check=True) -> int:
    if start != start.lstrip("0x"):
        #if hexadecimal
        return fromHexadecimal(start)
    def remove_prefixs(str_n: str) -> str:
        prefixs = ["0b","0o"]
        for i in prefixs:
            str_n = str_n.lstrip(i)
        return str_n
    if prefix_check:
        start = remove_prefixs(start)
    exponent = 0
    result = 0
    for i in reversed(start):
        result += int(i) * base**exponent
        exponent += 1
    return result
def to_custom_base_key(start: int,key: str) -> str:
    base = len(key)
    negativity = False # im a postive guy
    if start < 0:
        negativity = True
        start = -start
    mods = ""
    while start > 0:
        mod = start % base
        start //= base
        mods += f"{key[mod]}"
    final_string = "".join(reversed(mods))
    return final_string if not negativity else "-" + final_string



def from_custom_base_key(start: str, key: str,case_sensitive=True) -> int:
    negativity = True if start[0] == "-" else False
    start = start.replace("-","",1)
    """
    returns base-10 integer from alphanum string with alphanum symbol key
    case-sensitive arg is true by default
    """
    base = len(key)
    key = key if case_sensitive else key.lower()
    exponent = 0
    result = 0
    if case_sensitive:
        for i in reversed(start):
            try:
                result += key.index(i) * base**exponent
            except:
                raise ValueError(f"value({i}) not found in symbol key({base}):")
            exponent += 1
    else:
        for i in reversed(start):
            try:
                result += key.index(i.lower()) * base**exponent
            except:
                raise ValueError(f"value({i.lower()}) not found in symbol key({base}):")
            exponent += 1
    return result if not negativity else -result

def toBase62(start: int) -> str:
    symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    return to_custom_base_key(start,symbols)

def fromBase62(start: str):
    symbols = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    return from_custom_base_key(start,symbols)
def toHexadecimal(start: int,addprefix=False) -> str:
    """
    takes integer as input
    """
    hex_symbols = "0123456789abcdef"
    result = to_custom_base_key(start,hex_symbols)
    if start < 0 and addprefix:
        result = result.replace("-","-0x",1)
    elif addprefix:
        result = "0x" + result
    return result
def fromHexadecimal(start: str,prefix_check=True) -> int:
    """
    return base-10 integer type from hexadecimal string
    accepts negative inputs as either -0xff or 0x-ff
    prefix_check enables prefix removal: only disable if you know the prefix won't be in the input
    """
    negativity = False
    if start[0] == "-":
        negativity = True
        start = start.replace("-","",1)
    hex_symbols = "0123456789abcdef"
    def prefix_strip(str_strip: str) -> str:
        return str_strip.lstrip("0x") if not negativity else "-" + str_strip.lstrip("0x")
        return str_strip.lstrip("0x") if not negativity else "-" + str_strip.lstrip("0x")
        return str_strip.lstrip("0x") if not negativity else "-" + str_strip.lstrip("0x")
    start = prefix_strip(start) if prefix_check else start
    result = from_custom_base_key(start,hex_symbols)
    return result



def stirling_approx(n,improved=True):
    """
    implements stirling approximation for for the factorial of x when x is large
    stirling_approx = n! as n -> infinity
    at least 1% accuracy after n=8
    improved arg may take longer but for more accuracy
    """
    #test info for n = 170 (max edge case) to show difference between improved VS not improved
    #0.049007538683454754% percent error after 0.41003249200002756 seconds(improved = False)
    #0.000012010654685923328% percent error after 1.3458281109999461 seconds(improved = True)
    #this isnt even decimal form, this is after multiplying by 100 to get to percent form
    def sqrt(x):
        return x**0.5
    pi = 3.141592653589793238462643383279
    e = 2.7182818284590452353602
    main_approx = (sqrt(2*n*pi) * (n/e)**n)
    if improved:
        correction = 1+(1/(12*n))
        return (main_approx * correction)
        #extra correction terms
        #scraped because yes while they made the result more accurate, they made the program take 4x as long for n=170
        (1/(360*n**3))
        (1/(1260*n**5))
        (1/(1680*n**7))
        (1/(1188*n**9))
    else:
        return main_approx
#print ("0.049007538683454754 percent error after 0.41003249200002756 seconds")
#print ("0.000012010654685923328 percent error after 1.3458281109999461 seconds")
#print (timeit("ln(99999999999)",globals=globals()))
#print (100 - stirling_approx(170,True)/factorial(170)*100)
def pi_product(func, start: int, end: int,*args):
    start = round(start)
    end = round(end)
    final_product = 1
    for i in range(start,end+1):
        final_product *= (func(i,*args))
    return final_product

def sigma_sum(func, start: int, end: int,*args):
    start = round(start)
    end = round(end)
    final_sum = 0
    for i in range(start,end+1):
        final_sum += (func(i,*args))
    return final_sum
def tetration(base: int, tetra: int):
    if tetra == 1:
        return base
    base **= tetration(base,tetra-1)
    return base

def pentation(base: int, penta: int):
    if penta == 1:
        return base
    result = base
    for _ in range(penta - 1):
        result = tetration(base, result)
    return result

