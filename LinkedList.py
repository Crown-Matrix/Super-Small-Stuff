from random import shuffle
class node():
    def __init__(self,data,next=None):
        self.data = data
        self.next = next

        
class linked_list():
    def __init__(self):
        self.head = node(data=None)
        
    def append(self,data):
        new_node = node(data=data)
        current_node = self.head
        if self.head.next == None:
            self.head.next = new_node
            return
        while current_node.next != None:
            current_node = current_node.next
        #at this point current_node = last node
        current_node.next = new_node
        
    def prepend(self,data):
        new_node = node(data=data)
        new_node.next = self.head.next
        self.head.next = new_node
    
    def printList(self):
        current_node = self.head.next
        if current_node == None:
            print ("List Empty")
            return
        while current_node != None:
            print (current_node.data,"->",end=" ")
            current_node = current_node.next
        print ("None")
            
    def IndexData(self,index):
        if self.head.next == None:
            return "list is empty"
        current_node = self.head.next #starting at first real node to preserve 0-based indexing
        counter = 0
        while counter < index and current_node.next != None:
            counter += 1
            current_node = current_node.next
        if counter == index:
            return current_node.data
        else:
            return "Index Not Found"
            
    def IndexInsert(self,index,data):
        try:
            index = int(index)
        except:
            return "index input error"
        else:
            if index < 0:
                return "index input error"
        first_node = self.head.next
        target_index = index-1
        counter = 0
        current_node = first_node
        if self.head.next == None:
            if index == 0:
                self.head.next = node(data=data)
                return
            else:
                return "Index Error: Empty List"
        while target_index > counter and current_node.next != None:
            counter += 1
            current_node = current_node.next
        if current_node.next == None and target_index != counter:
            return "IndexError: Given Index Exceeds List Range"
        replaced_node = current_node.next
        current_node.next = node(data=data,next=replaced_node)
        return "Success"
        
    def deleteIndex(self,index):
        try:
            index = int(index)
        except:
            return "index input error"
        else:
            if index < 0:
                return "index input error"
        if self.head.next == None:
            return "Empty List"
        current_node = self.head
        counter = -1
        while counter < index and current_node.next != None:
            counter += 1
            previous_node = current_node
            current_node = current_node.next
        if current_node.next != None and counter != index:
            return "Index Error: index exceeds list range"
        previous_node.next = current_node.next
        return "Success"
        previous_node.next = current_node.next
        
    def convert_to_list(self):
        """
        returns a list containing elements of linked list
        returns empty list if linked list is empty
        """
        result = []
        current_node = self.head.next
        while current_node != None:
            result.append(current_node.data)
            current_node = current_node.next
        return result
        
    def mapFunction(self,func,*args):
        """
        *args include function object and any associated *args
        *changes are directly applied to each object in linked list
        """
        if type(func) != type(lambda:None):
            return "func paramater must be a callable function"
        current_node = self.head.next
        while current_node != None:
            current_node.data = func(current_node.data,*args)
            current_node = current_node.next
        return "success"
        
    def ProtectedMapFunction(self,func,*args):
        """
        *args include function object and any associated *args
        *changes are directly applied to each object in linked list

        Protected means each any raised exception will be ignored
        function arg will be ran on all list values regardless of exceptions
        """
        if type(func) != type(lambda:None):
            return "func paramater must be a callable function"
        current_node = self.head.next
        while current_node != None:
            try:
                current_node.data = func(current_node.data,*args)
            except:
                pass
            finally:
                current_node = current_node.next
        return "success"
    def IndexOf(self,data,method):
        """
        Returns index of occurence(s) in list
        Types:
        1. First Occurence
        2. Last Occurence
        3. All Occurences (returns list)
        """
        if self.head.next == None:
            return "List Empty"
        match method:
            case 1:
                current_node = self.head.next
                counter = 0
                while current_node != None and current_node.data != data:
                    counter += 1
                    current_node = current_node.next
                if current_node == None:
                    return "Data Not Found In List"
                return counter
            case 2:
                if self.head.next == None:
                    return "List Empty"
                current_node = self.head.next
                counter = 0
                indexes = []
                while current_node != None: 
                    if current_node.data == data:
                        indexes.append(counter)
                    counter += 1
                    current_node = current_node.next
                try:
                    return indexes[-1]
                except IndexError:
                    return "Data not in list"
                
            case 3:
                if self.head.next == None:
                    return "List Empty"
                current_node = self.head.next
                counter = 0
                indexes = []
                while current_node != None: 
                    if current_node.data == data:
                        indexes.append(counter)
                    counter += 1
                    current_node = current_node.next
                return indexes
            case _:
                return "Input Error: Given type must be 1 or 2"
        
    def contains(self,data):
        if self.head.next == None:
            return False
        current_node = self.head.next
        while current_node != None and current_node.data != data:
            current_node = current_node.next
        if current_node == None:
            return False
        return True
        
    def isEmpty(self):
        if self.head.next == None:
            return True
        else:
            return False
            
    def clear(self):
        self.head.next = None
        
    def RemoveLast(self):
        """
        Deletes last item in list
        Returns data in last item as result
        Will return error if List is empty
        """
        current_node = self.head.next
        if current_node == None:
            return "List Empty Error"
        while current_node.next != None:
            previous_node = current_node
            current_node = current_node.next
        previous_node.next = None
        return current_node.data
        
    def RemoveFirst(self):
        """
        Removes first item in list
        Returns data of first item
        Returns an error if list is empty
        """
        current_node = self.head.next
        if current_node == None:
            return "List Empty Error"
                
        self.head.next = None if current_node.next == None else current_node.next
        return current_node.data
        
    def RemoveData(self,data,method=1):
        """
        -Removes Occurence(s) of data in list depending on selected method

        -Returns index of occurence(s) as result

        Method definitions:
        1. All Occurences(Default)
        2. First Occurence
        3. Last Occurence
        """
        match method:
            case 1:
                current_node = self.head.next
                previous_node = self.head
                applicable = False
                counter = 0
                indexes = []
                while current_node != None:
                    if current_node.data == data:
                        previous_node.next = current_node.next #deleter
                        current_node = current_node.next
                        indexes.append(counter)
                        applicable = True
                    else:
                        previous_node = current_node
                        current_node = current_node.next
                    counter += 1
                if applicable:
                    return indexes
                return "data not found in list"
    
            case 2:
                current_node = self.head.next
                previous_node = self.head
                counter = 0
                while current_node != None:
                    if current_node.data == data:
                        previous_node.next = current_node.next #deleter
                        return counter
                    #if not a match continue updating variables
                    counter += 1
                    previous_node = current_node
                    current_node = current_node.next
                return "data not found in list"

            case 3:
                current_node = self.head.next
                previous_node = self.head
                counter = 0
                applicable = False
                while current_node != None:
                    if current_node.data == data:
                        #overwrite last match info with latest match info
                        current_match = current_node
                        previous_match = previous_node
                        counter_match = counter
                        applicable = True
                    counter += 1
                    previous_node = current_node
                    current_node = current_node.next
                if applicable:
                    previous_match.next = current_match.next #deleter
                    return counter_match
                return "data not found in list"
            case _:
                return "Input Error: Not valid method"
                
    def Filter(self,func,*args):
        """
        -Iterates through linked list running given function with each node as input.
        -Function should output True/False and will keep/delete a node in accordance.
        -Returns index list of nodes removed
        """
        current_node = self.head.next
        previous_node = self.head
        counter = 0
        indexes = []
        applicable = False
        while current_node != None:
            match func(current_node.data,*args):
                case True:
                    previous_node = current_node
                    current_node = current_node.next
                case False:
                    previous_node.next = current_node.next
                    current_node = current_node.next
                    indexes.append(counter)
                    applicable = True
                case _:
                    return f"FUNCTION ERROR: Given function did not output True/False after inputting the node at index {counter} with data {current_node.data}"
            counter += 1
        if applicable:
            return indexes
        return "success"
        
    def CreateFromList(given_list):
        new_linked_list = linked_list()
        current_node = new_linked_list.head
        for i in given_list:
            current_node.next = node(data=i)
            current_node = current_node.next
        return new_linked_list
        
    def ReplaceIndex(self,index,data):
        """
        -Replaces the nodes at index to  be replaced by a new node with the given data
        """
        try:
            index = int(index)
        except:
            return "Index Input Error"
        else:
            if index < 0:
                return "Index Input Error"
        counter = 0
        previous_node = self.head
        current_node = previous_node.next
        while counter != index and current_node.next != None:
            counter += 1
            previous_node = current_node
            current_node = current_node.next
        if counter != index:
            return "Index Error: Given Index Exceeds List Range"
        previous_node.next = node(data=data,next=current_node.next)
        return counter
        
    def ReplaceData(self,old_data,new_data,method):
        """
        -Replaces the nodes at specficiced occurence(determined by method) with a new node containing the given data

        Methods:
        1. All Occurences (returns list of occurence indexes)
        2. First Occurence (returns index)
        3. Last Occurence (returns index)
        """
        match method:
            case 1:
                if self.head.next == None:
                    return "List Empty!"
                current_node = self.head.next
                previous_node = self.head
                counter = 0
                applicable = False
                indexes = []
                while current_node != None:
                    if current_node.data == old_data:
                        applicable = True
                        indexes.append(counter)
                        current_node.data = new_data
                    previous_node = current_node
                    current_node = current_node.next
                    counter += 1
                if applicable:
                    return indexes
                return "Data not in list"
            case 2:
                if self.head.next == None:
                    return "List Empty!"
                current_node = self.head.next
                counter = 0
                while current_node != None:
                    if current_node.data == old_data:
                        current_node.data = new_data
                        return counter
                    current_node = current_node.next
                    counter += 1
                return "data not in list"
            case 3:
                if self.head.next == None:
                    return "List Empty!"
                current_node = self.head.next
                counter = 0
                while current_node != None:
                    if current_node.data == old_data:
                        current_match = current_node
                        current_counter = counter
                    current_node = current_node.next
                    counter += 1
                current_match.data = new_data
                return current_counter
                
    def length(self):
        current_node = self.head.next
        counter = 0
        while current_node != None:
            counter += 1 #counter at beginning of loop for 1-based indexing
            current_node = current_node.next
        return counter
        
    def sorter(self,func_key=None,method=1):
        """
        Sorts linked list using pythons built-in timsort
        Methods:
        1. Returns new instance of linked list with sorted data
        2. Directly changes the content of the given linked list instance
        returns linked_list object based on method
        """
        ll_list = self.convert_to_list()
        sorted_list = list(sorted(ll_list,key=func_key))
        
        match method:
            case 1:
                return linked_list.CreateFromList(sorted_list)
            case 2:
                current_node = self.head.next
                for i in sorted_list:
                    current_node.data = i
                    current_node = current_node.next
                return self
            case _:
                "Invalid method input"
        
    def BubbleSort(self):
        """
        linked_list sorter using bubble sort algorithin
        (repeatingly swaps value pairs that are in wrong order)
        """
        pass
        try:
            if self.head.next.next == None:
                return "List Empty!"
        except:
            return "list empty!"
        
        previous_node = self.head.next
        current_node = previous_node.next
        verified_node = previous_node
        counter = 0
        while True:
            applicable = True
            previous_node = verified_node
            current_node = verified_node.next
            while current_node != None:
                if current_node.data < previous_node.data:
                    counter += 1
                    current_node.data,previous_node.data = previous_node.data,current_node.data
                    previous_node = self.head.next
                    current_node = previous_node.next #resets the algorithin back at the beginning
                    #eventually the previous/current node will be set to the last node that was determined to not need a switch
                    applicable = False
                else:
                    verified_node = previous_node
                previous_node = previous_node.next
                current_node = current_node.next
            if applicable:
                break
                
    def findMin(self,method):
            current_node = self.head.next
            latest_node = current_node
            while current_node != None:
                try:
                    current_data = float(current_node.data)
                    if current_data < latest_node.data:
                        latest_node = current_node
                    current_node = current_node.next
                except:
                    pass
            match method:
                case 1: # returns node
                    return latest_node
                case 2: # returns node data
                    return latest_node.data
                case _:
                    return "invalid method input"
            return latest_node.data  
    def findMax(self,method):
            current_node = self.head.next
            latest_node = current_node
            while current_node != None:
                try:
                    current_data = float(current_node.data)
                    if current_data > latest_node.data:
                        latest_node = current_node
                    current_node = current_node.next
                except:
                    pass
            match method:
                case 1: #return node
                    return latest_node
                case 2: #return node data
                    return latest_node.data
                case _:
                    return "invalid method input"
    def SelectionSort(self):
        """
        Directly Changes linked_link instance using the SelectionSort Algorithim
        
        Doesnt Return Anything
        """
        if self.head.next == None:
            return "List Empty"
        elif self.head.next.next == None:
            return self.head.next
        latest_node = self.head.next
        while latest_node != None:
            current_node = latest_node
            lowest_found_node = current_node
            while current_node != None:
                if current_node.data < lowest_found_node.data:
                    lowest_found_node = current_node
                current_node = current_node.next
            lowest_found_node.data,latest_node.data = latest_node.data,lowest_found_node.data
            latest_node = latest_node.next     
    def SplitList(self,method):
        """
        Splits linked list down middle

        The original list will not be changed

        if length is odd, the first half will be the bigger half

        Methods:
        1: Returns new linked list object containing data from the first half
        2: Returns new linked list object containing data from the second half
        3: Returns both new deep copied halves in a [x,y] list
        """
        first_node = self.head.next
        if first_node == None or first_node.next == None:
            return "List Length must be at least 2!"
        match method:
            case 1:
                fast_counter = self.head.next
                slow_counter = self.head.next
                while fast_counter != None and fast_counter.next != None and fast_counter.next.next != None: ## floor divison by 2
                    fast_counter = fast_counter.next.next
                    slow_counter = slow_counter.next
                slow_counter.next = None #split the halves
                current_node = self.head.next
                new_list = linked_list()
                while current_node != None:
                    new_list.append(current_node.data)
                    current_node = current_node.next
                return new_list
            case 2:
                first_node = self.head.next
                if first_node.next.next == None:
                    new_list = linked_list()
                    new_list.append(first_node.next.data)    
                    return new_list
                fast_counter = first_node
                slow_counter = first_node
                while fast_counter != None and fast_counter.next != None:
                    fast_counter = fast_counter.next.next
                    slow_counter = slow_counter.next
                result = slow_counter.next
                slow_counter.next = None #disconnect the halves
                current_node = result
                new_list = linked_list()
                while current_node != None:
                    new_list.append(current_node.data)
                    current_node = current_node.next
                return new_list
            case 3:
                fast_counter = self.head.next
                slow_counter = self.head.next
                while fast_counter != None and fast_counter.next != None and fast_counter.next.next != None: ## floor divison by 2
                    fast_counter = fast_counter.next.next
                    slow_counter = slow_counter.next
                second_half_head = slow_counter.next # save second half before split
                slow_counter.next = None #split the halves
                current_node = self.head.next
                new_first_list = linked_list()
                new_second_list = linked_list()
                while current_node != None:
                    new_first_list.append(current_node.data)
                    current_node = current_node.next
                current_node = second_half_head
                while current_node != None:
                    new_second_list.append(current_node.data)
                    current_node = current_node.next
                return [new_first_list,new_second_list]
            case _:
                "Invalid Method Input"         
    def __iter__(self):
        def generator():
            curerent_node = self.head.next
            while curerent_node != None:
                yield curerent_node.data
                curerent_node = curerent_node.next
        return generator()
    def CopyList(self):
        new_list = linked_list()
        for i in self:
            new_list.append(i)
        return new_list
    def ReverseList(self,method=1):
        """"
        Returns a reversed linked list

        Methods:
        1. Directly changes the linked list instance
        2. Creates a reversed copy of the linked list instance instead
        """
        match method:
            case 1:
                previous_node = None
                current_node = self.head.next
                while current_node != None:
                    next_node = current_node.next
                    current_node.next = previous_node
                    previous_node = current_node
                    current_node = next_node
                self.head.next = previous_node
                return self
            case 2:
                new_list = self.CopyList()
                previous_node = None
                current_node = new_list.head.next
                while current_node != None:
                    next_node = current_node.next
                    current_node.next = previous_node
                    previous_node = current_node
                    current_node = next_node
                new_list.head.next = previous_node
                return new_list
            case _:
                return "method input error"
    
    def SortedCheck(self):
        """
        Returns True if sorted
        Returns False if not sorted
        """
        previous_node = self.head.next
        current_node = previous_node.next
        while current_node != None:
            if previous_node.data > current_node.data:
                return False
            previous_node = current_node
            current_node = current_node.next
        return True

    def MergeWith(self,second_list,SortCheck=True):

        if type(second_list) != linked_list:
            print ("\nInput Error: second_list is not a linked list!\n")
            return "Input Error: second_list is not a linked list!"
        if SortCheck and ((not self.SortedCheck()) or (not second_list.SortedCheck())):
            print ("\nInput Error: second_list is not a linked list!\n")
            return "SortedCheck_Result: At least one of Lists not sorted"
        if self.head.next == None:
            return second_list
        elif second_list.head.next == None:
            return self #above handles case of one of the lists being empty (will just return the other one)
        new_list = linked_list()
        first_current = self.head.next
        second_current = second_list.head.next
        while True:
            if first_current.data < second_current.data:
                new_list.append(first_current.data)
                first_current = first_current.next
            else:
                new_list.append(second_current.data)
                second_current = second_current.next
            #above compares the current node data, appends lowest to new, and moves through the list that had the lowest
            if ((first_current==None) and (second_current==None)):
                return new_list
            elif first_current == None:
                #add remaing items in second list
                while second_current != None:
                    new_list.append(second_current.data)
                    second_current = second_current.next
                return new_list
            elif second_current == None:
                while first_current != None:
                    new_list.append(first_current.data)
                    first_current = first_current.next
                return new_list
    def __str__(self):
        result = ["Head"]
        for i in self:
            result.append(str(i))
        return f"{self.__repr__()}     {"  ->  ".join(result)}"
    def RemoveDuplicates(self):
        """
        Removes any Duplicates of linked_list
        Keeps the first instance and removes the rest
        Returns resolved instance
        """
        knowns = set()
        previous_node = self.head
        current_node = self.head.next
        while current_node != None:
            if current_node.data in knowns:
                previous_node.next = current_node.next #delete the node
            else:
                knowns.add(current_node.data)
            previous_node = current_node
            current_node = current_node.next
        return self
    
    def slicer(self, start: int,end: int,step: int=1):

        MAX_BUFFER_SIZE = 50
        #if negative slicing index, buffer method is used if within range of max
        def negative_slice_iter(index):
            k = abs(index)
            if k <= MAX_BUFFER_SIZE:
                #buffer method used
                buffer_array = []
                current_node = self.head
                while current_node != None:
                    buffer_array.append(current_node)
                    if len(buffer_array) > MAX_BUFFER_SIZE:
                        buffer_array.pop(0)
                    current_node = current_node.next
                current_node = buffer_array[0]
            else:
                start = self.length()-k
                current_node = self.head
                for _ in range(start+1):
                    current_node = current_node.next
            return current_node
        if start == None:
            start = 0
        copied = linked_list()
        tail = copied.head

        if step == 0:
            raise ValueError("slicing step can't be zero")

        #iterate to start,after: current_node = node at index start
        if start >= 0:
            current_node = self.head
            for _ in range(start+1):
                current_node = current_node.next
        else: #negative slicing
            current_node = negative_slice_iter(start)
        
        if end < 0:
            end = self.length()+end+1

        if step > 0: #positive step
            idx = start
            while current_node is not None and idx < end:
                tail.next = node(current_node.data)
                tail = tail.next
                # advance step times
                for _ in range(step):
                    if current_node is not None:
                        current_node = current_node.next
                        idx += 1
                    else:
                        break
        else: #negative step
            # collect all nodes into a list for reverse traversal cuz no way a single way linked list is gonna be negatively transversed
            # if we have to iterate through either way, must as well create a list
            nodes = []
            temp_node = self.head.next
            while temp_node is not None:
                nodes.append(temp_node)
                temp_node = temp_node.next
            length = len(nodes)
            s = start if start is not None else length - 1
            e = end if end is not None else -1
            if s < 0:
                s += length
            if e < 0:
                e += length
            idx = s
            while idx > e and idx >= 0 and idx < length:
                tail.next = node(nodes[idx].data)
                tail = tail.next
                idx += step
        return copied

    def __getitem__(self,index: int | slice):
        if isinstance(index,int):
            index = int(index)
            return self.IndexData(index)
        elif isinstance(index,slice):
            return self.slicer(index.start,index.stop,index.step) #TODO
        else:
            raise TypeError("Integer or Slice object expected")
            
    
    
    def shallow_copy(self):
        shallow_copied_head = linked_list()
        shallow_copied_tail = shallow_copied_head.head
        current_node = self.head.next
        while current_node is not None:
            shallow_copied_tail.next = node(current_node.data)
            shallow_copied_tail = shallow_copied_tail.next
            current_node = current_node.next
        return shallow_copied_head

    def merge_sort(self):
        """
        Returns sorted shallow copy of linked list instance
        """
        if self.head.next is None or self.head.next.next is None:
            return self.shallow_copy()
        ll_halves = self.SplitList(method=3)
        first_half: linked_list = ll_halves[0]
        second_half: linked_list = ll_halves[1]

        first_half = first_half.merge_sort()
        second_half = second_half.merge_sort()

        def merge(list1: linked_list, list2: linked_list):
            current_node_1 = list1.head.next
            current_node_2 = list2.head.next

            dummy_node = node(None)
            tail = dummy_node

            while current_node_1 is not None and current_node_2 is not None:
                if current_node_1.data < current_node_2.data:
                    tail.next = node(current_node_1.data)
                    current_node_1 = current_node_1.next
                else:
                    tail.next = node(current_node_2.data)
                    current_node_2 = current_node_2.next
                tail = tail.next

            while current_node_1 is not None:
                tail.next = node(current_node_1.data)
                tail = tail.next
                current_node_1 = current_node_1.next
            
            while current_node_2 is not None:
                tail.next = node(current_node_2.data)
                tail = tail.next
                current_node_2 = current_node_2.next
            # in case of odd len(LL)
            merged_list = linked_list() # shallow copy of head
            merged_list.head.next = dummy_node.next # connect el data
            return merged_list #viola (im sorry im rlly glad this worked so well)

        new_list = merge(first_half, second_half)
        return new_list
    def shuffle(self,method=1):
        """
        shuffles list elements

        Methods:
        1 - Returns linked list instance
        2 - Returns in array instead
        """
        array = self.convert_to_list()
        shuffled_array = shuffle(array) #imported from *random*
        match method:
            case 1:
                return linked_list.CreateFromList(shuffled_array)
            case 2:
                return shuffled_array
            case _:
                raise ValueError("invalid input for method")
        

        

    




def TimeItTests(LIST_LENGTH = 150,DATA_RANGE_MINIMUM = 0, DATA_RANGE_MAXIMUM = 99999999999,TEST_AMOUNT = 100,BUBBLE_SORT=True,SELECTION_SORT=True,TIM_SORT=True,MERGE_SORT=True):
    """
    Generates random lists with defined parameters to test sorting algorithims
    Automatically prints results after
    
    LIST_LENGTH - how long each list is

    DATA_RANGE_MINIMUM - minimum amount for data in list

    DATA_RANGE_MAXIMUM - maximum amount for data in list

    TEST_AMOUNT - amount of lists created for each algorithim

    Sorting algorithim name paramaeters allow the choosing of which algorithims to run

    For example: Set BUBBLE_SORT = False (if you dont want bubble sort to be ran)
    """
    from random import randrange
    from timeit import timeit
    def randomLinkedList():
        return linked_list.CreateFromList([randrange(DATA_RANGE_MINIMUM,DATA_RANGE_MAXIMUM) for i in range(LIST_LENGTH)])    
    def bubbly():
        testee = randomLinkedList()
        testee.BubbleSort()
    def selective():
        testee = randomLinkedList()
        testee.SelectionSort()
    def timmy():
        testee = randomLinkedList()
        testee = sorted(testee.convert_to_list())
        testee = linked_list.CreateFromList(testee)
    def merge():
        testee = randomLinkedList()
        testee.merge_sort()
    print ("loading...",flush=True)
    if BUBBLE_SORT:
        apple = (timeit(stmt=bubbly,number=TEST_AMOUNT))
    else:
        apple = "Not Ran"
    print(f"Bubble Sort: {apple}")
    if SELECTION_SORT:
        bannana = (timeit(stmt=selective,number=TEST_AMOUNT))
    else:
        bannana = "Not Ran"
    print(f"Selection Sort: {bannana}")
    if TIM_SORT:
        orange = (timeit(stmt=timmy,number=TEST_AMOUNT))
    else:
        orange = "Not Ran"
    print(f"Tim Sort: {orange}")
    if MERGE_SORT:
        peach = (timeit(stmt=merge,number=TEST_AMOUNT))
    else:
        peach = "Not Ran"
    print(f"Merge Sort: {peach}")
    #print (f"Bubble Sort: {apple}\nSelection Sort: {bannana}\nTim Sort: {orange}\nMerge Sort: {peach}")
    print (f"\nTest Information:\nDataRange:({DATA_RANGE_MINIMUM}-{DATA_RANGE_MAXIMUM})\nListLength: {LIST_LENGTH}\nTestAmount: {TEST_AMOUNT}")
    print ("\nExtra note: TimSort converts the linked list to a regular list first then converts the list back into a linked_list)")

#TimeItTests(BUBBLE_SORT=False,SELECTION_SORT=False,LIST_LENGTH=2000,TEST_AMOUNT=50)