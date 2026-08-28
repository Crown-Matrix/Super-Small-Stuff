# Minimum Python interpretator version: 3.0+


addition_prompt = """
======================================================
which type of addition do you wanna do?


1. signed magnitude

2. complement's 1

3. complement's 2

Input your decision: """



def convertToBinary(x: int) -> str:
    return str(int( x < 0 )) + bin(abs(x))[2:]

def complements1(x: str) -> str:
    if not int(x[0]):
        return x

    return x[0] + ''.join(str(1 - int(i)) for i in x[1:])


def complements1to2(x: str) -> str:
    sum_int = int(x,2) + int("1",2)
    return bin(sum_int)[2:]

def complements2(x: str) -> str:
    bit_length = len(x)

    if x[0] == '0':
        # positive number, 2's complement representation == itself
        return x
    else:
        # negative number: invert all bits (1's complement), then add 1
        inverted = complements1(x)
        added = complements1to2(inverted)
        # complements1to2 doesn't pad/truncate, so fix width here
        return added.zfill(bit_length)[-bit_length:]


def signedBinaryToDecimal(b: str, mode: str) -> int:
    # decodes a sign-bit-first binary string back to a signed base-10 int.
    # unlike the original, this now branches on `mode`, because signed
    # magnitude, 1's complement, and 2's complement all encode negative
    # numbers differently and need different decode formulas.
    if b[0] == '0':
        return int(b, 2)

    magnitude_bits = b[1:]

    if mode == 'magnitude':
        # negative value is just -(magnitude)
        return -int(magnitude_bits, 2)

    if mode == 'ones':
        # negative value in 1's complement is -( (2^n - 1) - magnitude )
        # i.e. bitwise-invert the magnitude bits and negate
        all_ones = int('1' * len(magnitude_bits), 2)
        return -(all_ones - int(magnitude_bits, 2))

    if mode == 'twos':
        # standard 2's complement decode
        return int(b, 2) - (1 << len(b))

    raise ValueError(f"unknown mode: {mode}")


def padToSameLength(x: str, y: str) -> tuple:
    # pads the shorter operand with 0-bits right after its sign bit
    # so both strings end up the same length. shared by the 1's and
    # 2's complement addition routines (previously duplicated inline).
    if len(x) == len(y):
        print('both numbers are the same bit length, no padding needed')
        return x, y

    print('both numbers are different bit length, some padding is needed')

    if len(x) > len(y):
        print('x is bigger, adding 0-bit padding to y -->', end="")
        y = y[0] + ("0" * (len(x) - len(y))) + y[1:]
        print(" " + y)
    else:
        print('y is bigger, adding 0-bit padding to x -->', end="")
        x = x[0] + ("0" * (len(y) - len(x))) + x[1:]
        print(" " + x)

    return x, y


def addGuardBit(x: str, y: str) -> tuple:
    # inserts one extra 0 magnitude bit into both operands (right after
    # the sign bit) so there's enough headroom to hold the sum without
    # overflowing the representable range. same-sign addition of two
    # n-bit signed values can need up to n+1 bits to hold the result --
    # e.g. -1 and -3 each fit in a 3-bit signed width, but their sum
    # (-4) does not fit in the *magnitude* range that 3-bit width allows.
    # padToSameLength only guarantees x and y match each other's width,
    # not that their sum will fit, so this runs separately, after it.
    print('adding a guard bit to both operands to make room for the sum')
    x = x[0] + '0' + x[1:]
    y = y[0] + '0' + y[1:]
    print(x, y)
    return x, y




x = int(input("\nEnter a signed integer: "))


signed_binary_x = convertToBinary(x)
print ('signed binary rep:', signed_binary_x)


    
complements1_x = complements1(signed_binary_x)
print ('converted to complement\'s 1:',complements1_x)



complements2_x = complements2(signed_binary_x)
print ('converted to complement\'s 2:',complements2_x)




#======= y section ======

# should just be a duplicate of the x section but for a second integer

y = int(input("\nEnter another #2 signed integer: "))

signed_binary_y = convertToBinary(y)
print ('signed binary rep:', signed_binary_y)

complements1_y = complements1(signed_binary_y)
print ('converted to complement\'s 1:',complements1_y)

complements2_y = complements2(signed_binary_y)
print ('converted to complement\'s 2:',complements2_y)




addition_choice = int(input(addition_prompt))



def signedMagnitudeAddition(x: str, y: str):

    print ('using signed magnitude addition for base-10 integers:', x, "&", y)
    #if same sign, simply add together
    #if different sign, subtract
    # either way, remove the sign bit before adding

    if (x[0] == y[0]):
        #same sign
        print ("Same Sign Bit Detected")

        print ('seperating sign bit for simplicity')
        print (x, "->", x[1:])
        print (y, "->", y[1:])

        total = bin(int(x[1:],2) + int(y[1:],2))[2:]
        print ('added together:', total)

        print ('must add the sign bit',x[0], 'back:')

        result = x[0] + total

        print ('result:',result)

        return result
    else:
        int_x = int(x[1:], 2)
        int_y = int(y[1:], 2)

        print ("Different Sign Bit Detected")

        print ('seperating sign bit from magnitude so we can see which one is more')
        print (x, "->", x[1:])
        print (y, "->", y[1:])

        if int_x >= int_y:
            bigger_magnitude = int_x
            smaller_magnitude = int_y
            print ("bigger element is x","(",x[1:],")")
            print ("smaller element is y","(",y[1:],")")
            sign = x[0]
        else:
            bigger_magnitude = int_y
            smaller_magnitude = int_x
            print ("bigger element is y","(",y[1:],")")
            print ("smaller element is x","(",x[1:],")")
            sign = y[0]
        print ('Resulting calculated sign bit:', sign)
        result = sign + bin(bigger_magnitude - smaller_magnitude)[2:] 
        print ('Final result:',result)
        return result




def onesComplementAddition(x:str, y:str):

    print ('using 1\'s complement addition for base-10 integers:', x, "&", y)

    x, y = padToSameLength(x, y)
    x, y = addGuardBit(x, y)

    old_x = x
    old_y = y
    x = complements1(x)
    y = complements1(y)

    print("converted x(" + old_x + ") to 1's complement:", x)
    print("converted y(" + old_y + ") to 1's complement:", y)
    
    common_bit_length = len(x)

    # add them together
    raw_sum = bin(int(x, 2) + int(y, 2))[2:]
    raw_sum = raw_sum.zfill(common_bit_length)
    print ('added both together to get:', raw_sum)

    final_sum = raw_sum
    while True:

        if (len(final_sum) > common_bit_length):
            print ('bit-overflow, carry-around required')
            delta_bit_length = len(final_sum) - common_bit_length
            print (delta_bit_length, 'extra bits detected')
            partial_sum = final_sum[delta_bit_length:]
            carried_sequence = final_sum[:delta_bit_length]
            print ('adding', carried_sequence, "to the end of the rest of the sequence(" + partial_sum + ")")
            #use carry around rule
            carried_result = bin(int(partial_sum, 2) + int(carried_sequence, 2))[2:]
            print ('processed sum:',carried_result)

            final_sum = carried_result
            if (len(final_sum) < common_bit_length):
                print ("Padding requirement detected, output has less bits than input")
                final_sum = final_sum.zfill(common_bit_length)
                print ('Final padded result:',final_sum)
                break
            elif len(final_sum) == common_bit_length:
                print ("no padding required, output is already same bit length as input")
                print ('final result:', final_sum)
                break
            else:
                print ('extra carryover requirement detected')

        else:
            print ('no bit-overflow, carry-around is not required')
            #dont use carry around rule
            break

    return final_sum


def twosComplementAddition(x: str, y: str):

    print('using 2\'s complement addition for base-10 integers:', x, "&", y)

    x, y = padToSameLength(x, y)
    x, y = addGuardBit(x, y)

    old_x = x
    old_y = y
    x = complements2(x)
    y = complements2(y)

    print("converted x(" + old_x + ") to 2's complement:", x)
    print("converted y(" + old_y + ") to 2's complement:", y)

    common_bit_length = len(x)

    # add them together
    raw_sum = bin(int(x, 2) + int(y, 2))[2:]
    raw_sum = raw_sum.zfill(common_bit_length)
    print('added both together to get:', raw_sum)

    if len(raw_sum) > common_bit_length:
        print('bit-overflow detected, discarding carry-out bit (no carry-around in 2\'s complement)')
        delta_bit_length = len(raw_sum) - common_bit_length
        print(delta_bit_length, 'extra bit(s) detected, dropping them')
        final_sum = raw_sum[delta_bit_length:]
        print('final result after discarding overflow:', final_sum)
    else:
        print('no bit-overflow, result stands as-is')
        final_sum = raw_sum

    print('final result:', final_sum)
    return final_sum


# i woulve used match-case here but i wanted 3.0+ python compatibility so
if addition_choice == 1:
    result = signedMagnitudeAddition(signed_binary_x, signed_binary_y)
    decoded = signedBinaryToDecimal(result, 'magnitude')
    print('parsing this back to base 10 for final output:')
    print(int(str(x),10), "+", int(str(y),10), '=', decoded, "=", result)
    print('\n[', decoded, ']')
elif addition_choice == 2:
    result = onesComplementAddition(signed_binary_x, signed_binary_y)
    decoded = signedBinaryToDecimal(result, 'ones')
    print('parsing this back to base 10 for final output:')
    print(int(str(x),10), "+", int(str(y),10), '=', decoded, "=", result)
    print('\n[', decoded, ']')
elif addition_choice == 3:
    result = twosComplementAddition(signed_binary_x, signed_binary_y)
    decoded = signedBinaryToDecimal(result, 'twos')
    print('parsing this back to base 10 for final output:')
    print(int(str(x),10), "+", int(str(y),10), '=', decoded, "=", result)
    print('\n[', decoded, ']')
else:
    print('invalid choice')