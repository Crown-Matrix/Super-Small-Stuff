import random as rand
from time import sleep as wait
import os
SecondCardReveal = False
def printChoices():
    print ("""
        •1 - Hit (Draw Another card)
        •2 - Stand (Keep Your Hand)
     """)
def RandomIndexReturn(x):
    return x[rand.randrange(0,len(x))]
def clearOutput():
    global IsDealerTurn
    global DealerInv
    global SecondCardReveal
    global IsDealerTurn
    os.system("clear")
    print ("---------------------\n")
    print ("Dealer Currently Has:\n")
    if SecondCardReveal:
        for i in DealerInv:
            print ("•"+CardString(i))
        print ("With a total value of",DealerValue())
    else:
        print ("•"+CardString(DealerInv[0]))
        print ("•?????????????")
    print ("\n---------------------\n")
    print ("You Currently Have:\n")
    for i in PlayerInv:
        print ("•"+CardString(i))
    print ("With a total value of",PlayerValue())
    print ("\n---------------------")
    if IsPlayerTurn and len(PlayerInv) != 2:
        print ("You have been dealt a",str(CardString(PlayerInv[-1])))
    elif IsDealerTurn and len(DealerInv) == 2:
        print ("\nthe dealer flips over his second card from earlier as a: "+str(CardString(DealerInv[1])))
def PlayerValue():
    x = 0
    for i in PlayerInv:
        if i[0] >= 10:
            x += 10
        elif i[0] == 1 and x > 10:
            x += 1
        elif i[0] == 1 and x <=10:
            x += 11
        else:
            x += i[0]
    return x
def DealerValue():
    x = 0
    for i in DealerInv:
        if i[0] >= 10:
            x += 10
        elif i[0] == 1 and x > 10:
            x += 1
        elif i[0] == 1 and x <=10:
            x += 11
        else:
            x += i[0]
    return x
def RandomCard():
    try:
        x = range(1,14)
        y = ["spade","club","heart","diamond"]
        return [RandomIndexReturn(x),RandomIndexReturn(y)]
    except IndexError:
        print ("i was told to return",RandomIndexReturn(x),"and",RandomIndexReturn(y))
        print ("x="+str(x),"y="+str(y))

CardFaceId = {11:"Jack",12:"Queen",13:"King",1:"Ace"}

def CardString(x):
    #x is card list
    num = x[0]
    if num > 10 or num == 1:
        Name = CardFaceId.get(num)
    else:
        Name = str(num)
    return (str(Name)+" of "+str(x[1])+"s")
    

def DealerMove():
    global round_over
    global DealerInv
    global winner
    global IsDealerTurn
    wait (0.75)
    IsDealerTurn = True
    pv = PlayerValue()
    wait(1.25)
    if len(DealerInv) == 2:
        wait (0.5)
        print ("\nthe dealer flips over his second card from earlier as a: "+str(CardString(DealerInv[-1]))+"\n")
        wait (2)
        print ("\n----------------------\n")
        for i in DealerInv:
            print ("•"+CardString(i))
        print ("With a total value of",DealerValue())
    clearOutput()
    while IsDealerTurn:
        dv = DealerValue()
        if dv >= 21:
            if dv == 21:
                IsDealerTurn = False
                print ("the dealer has made a blackjack")
            else:
                IsDealerTurn = False
                print ("the dealer has bust")
                round_over = True
                winner = "player"
        wait(2)
        if dv <= 11 and dv>pv and not round_over:
            #hit
            DealerInv.append(RandomCard())
            clearOutput()
            print ("the dealer, despite having already beat you, decides to hit just to embarass you")
            print ("the dealer laughingly drew a",CardString(DealerInv[-1]))
            dv = DealerValue()
            print ("\nthe dealer now has a value of",dv)
        elif dv > pv and not round_over:
            #stand
            clearOutput()
            print ("the dealer stands with a value of",dv)
            break
        elif dv == pv and dv>15 and not round_over:
            if rand.randrange(1,5) == 1:
                #hit
                DealerInv.append(RandomCard())
                clearOutput()
                print ("the dealer hits, adding a",CardString(DealerInv[-1]))
                dv = DealerValue()
                print ("\nthe dealer now has a value of",dv)
            else:
                if dv < 21 and not round_over:
                    clearOutput()
                    print ("the dealer stands with a value of",dv)
                #stand
                break
        elif dv == pv and dv>11 and not round_over:
            if rand.randrange(1,5) > 1 and not round_over:
                #hit
                DealerInv.append(RandomCard())
                clearOutput()
                print ("the dealer hits, adding a",CardString(DealerInv[-1]))
                dv = DealerValue()
                print ("\nthe dealer now has a value of",dv)
            elif not round_over:
                #stand
                clearOutput()
                print ("the dealer stands with a value of",dv)
                break
        elif dv < pv and not round_over:
                #hit
                DealerInv.append(RandomCard())
                clearOutput()
                print ("the dealer hits, adding a",CardString(DealerInv[-1]))
                dv = DealerValue()
                print ("\n\nthe dealer now has a value of",dv)
        
            
            

        
        

def PlayerMove():
    global winner
    global round_over
    global IsPlayerTurn
    clearOutput()
    printChoices()
    while True:
        decision = input("\n Type your move: ")
        if decision == "1" or decision == "2":
            decision = int(decision)
            break
    if decision == 1:
        while IsPlayerTurn:
            print ("\nthe dealer stares into your eyes as he slides over your next card")
            wait (1)
            PlayerInv.append(RandomCard())
            print ("You have been dealt a",str(CardString(PlayerInv[-1])))
            wait (1)
            pv = PlayerValue()
            print ("your current card value is at",pv)
            if pv == 21:
                wait(1)    
                print ("the dealer growls cuz u made blackjack")
                IsPlayerTurn = False
                round_over = True
                winner = "player"
                break
            elif pv > 21:
                print ("the dealer cackles in victory")
                IsPlayerTurn = False
                round_over = True
                winner = "dealer"
                break
            else:
                clearOutput()
                PlayerMove()
    else:
        print ("\nYou stand with the mighty value of",PlayerValue(),"\n")
        IsPlayerTurn = False



def blackprint():
    print ("""
                ♠️--------------------♦️
            ---Welcome to BlackJack----
                ♥️--------------------♣️
     """)
def CashManager():
    global cash
    global bet
    global winner
    try:
        if winner == 'dealer':
            cash -= bet
            print ("cash has been decreased by",bet,"to:",cash)
            wait (2)
        elif winner == 'player':
            cash += bet
            print ("cash has been increased by",bet,"to:",cash)
            wait (2)
    except NameError:
            pass


def ShowDown():
    global cash
    global PlayerInv
    global DealerInv
    global winner
    global round_over
    pv = PlayerValue()
    dv = DealerValue()
    if pv == dv:
        print ("it is a push(tie)")
        winner = "no one"
        round_over = True
    elif pv > dv:
        print ("player wins")
        winner = "player"
        round_over = True
    else:
        print ("dealer wins")
        winner = "dealer"
        round_over = True
    #follow with cashmanager function





def Round():
    global cash
    global bet
    global round_over #i forgot to put this line for so long and it broke so much lol
    global winner
    global PlayerInv
    global IsPlayerTurn
    global DealerInv #almost forgot this one too
    global SecondCardReveal
    global IsDealerTurn
    SecondCardReveal = False
    round_over = False
    IsDealerTurn = False
    try:
        cash = cash
    except NameError:
        cash = 1000
    winner = "no one"
    while True:
        try:
            print ("\n\nYou currently have",str(cash)+"$","available")
            bet = input("Place your bet for the round: ")
            bet = int(bet)
            if bet > 0 and bet <= cash:
                os.system("clear")
                break
            else:
                os.system("clear")
                blackprint()
                print ("\n\n\n\nrules include:\n")
                print ("""
                    •Not Below or Equal to Zero
                    •Not above your cash amount
                """)
        except ValueError:
            os.system("clear")
            blackprint()
            print ("\n\n\n\nrules include:\n")
            print ("""
                •Not Below or Equal to Zero
                •Not above your cash amount
            """)
    print ("the dealer laughs evily while reaching for the deck to draw his two cards")
    DealerInv = [RandomCard(),RandomCard()]
    wait(3)
    if DealerInv[0][0] == 1:
        print ("the dealers first card is an ace")
        print ("the dealer will check if his second card will give him blackjack")
        wait(3)
        if DealerInv[1][0] >= 10:
            print ("The Dealer Reveals a black jack with his second card being a "+str(CardString(DealerInv[1])))
            round_over = True
            winner = "dealer"
        else:
            print ("The Dealers evil plan is foiled as his card does not give him blackjack")
    elif DealerInv[0][0] >= 10:
        print ("dealers first card is a:\n")
        print (CardString(DealerInv[0]))
        print ("the dealer will check if his second card will give him blackjack")
        wait (3)
        if DealerInv[1][0] == 1:
            print ("The Dealer Reveals a black jack with his second card being a "+str(CardString(DealerInv[1])))
            round_over = True
            winner = "dealer"
        else:
            print ("The Dealers evil plan is foiled as his card does not give him blackjack")
    else:
        print ("\nThe dealers reveals his first card to be:")
        wait (2)
        print (CardString(DealerInv[0]))
        print ("\n")
    if not round_over:
        wait(3)
        print ("\nThe Dealer has dealt you your cards\n")
        wait(1)
        PlayerInv = [RandomCard(),RandomCard()]
        print ("You were dealt a:")
        wait(1)
        print ("•"+str(CardString(PlayerInv[0])))
        wait (1)
        print ("•"+str(CardString(PlayerInv[1]))+"\n")

        #
        #    Initial Cards Drawn
        #
        x = PlayerValue()     
        print (x,"is the total value of your cards\n")
        wait(1)
        if x == 21 :
            print ("the dealers mouth drops as you have achieved a blackjack")
            round_over = True
            winner = "player"
        else:
            print ("the dealer smirks cuz its time for you to decide your next move:\n")
            IsPlayerTurn = True
            if not round_over: #if round is still going
                while True:
                    PlayerMove()
                    if round_over:
                        print ("round over with the",winner,"as the winner")
                        CashManager()
                        return cash
                    else:
                        SecondCardReveal = True
                        DealerMove()
                        if round_over:
                            print ("round over with the",winner,"as the winner")
                            CashManager()
                            return cash
                        else:
                            ShowDown()
                            CashManager()
                            return cash
                                
            else:
                print ("round over with the",winner,"as the winner")
                CashManager()
                return cash
                
        print ("round over with the",winner,"as the winner") #instant player blackjack
        CashManager()
        return cash
    else:
        #instant dealer blackjack
        print ("round over with the",winner,"as the winner")
        CashManager()
        return cash

        
    
                

#-------------------------------------------------------------
#Intialization
blackprint()
#Driva Code
while Round() != 0:
  pass
print ("game over you brokie")
