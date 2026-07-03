# **Implemented Methods for Linked List**

### Prepend(data)
-Adds given data to beginning of list

### Append(data)
-Adds given data to end of list

### PrintList()
-Prints List Out

### IndexData(index)
-Retrieves the data value from the node at the given index

### IndexInsert(index,data)
-Inserts a node at the given index with the given data

### DeleteIndex(index)
-Deletes the node at the given index

### convert_to_list()
-Returns linked list in regular list

### MapFunction(func,*args)
-for each item linked list, runs given function with the item as the main parameter

-Allows for more than one parameter

(only the first(main) parameter will be set to each item in the list)

### ProtectedMapFunction(func,*args)
-Protected means if any exception is rasied while running the given function with an item in the list, the exception will be ignored and continue looping through the list running the function on all items

### IndexOf(data,method)
-Returns index of occurence(s) of nodes with the given data.
Method:
1. First Occurence
2. Last Occurence
3. All Occurences (returns list)

### contains(data)
-Returns True/False for if the given data is within any of the nodes in the linked list

### isEmpty()
-Returns True/False for if the list is empty or not

### clear()
-Disconnects all nodes from head node

### length()
-Returns length of linked list

-Returns 0 if empty

### RemoveLast()
-Deletes last item in list

-Returns data in the last item as a result

-Returns error if list is empty

### RemoveFirst()
-Removes first item in list

-Removes data of first item

-Returns an error if list is empty

### RemoveData(data,method)
-Removes occuence(s) of nodes with the given data in accordance to the specific type.

-Methods:
1. All occurences
2. First Occurence
3. Last Occurence

-Returns index of occurence(s) as result

-Returns "data not found in list" when no occurences found

### Filter(func,*args)
-Iterates through linked list running given function with each node as input.

-Function should output True/False and will keep/delete a node in accordance.

-Returns index list of nodes removed

**Example:**
```python
def CheckIfFactor(num,factor):
    if num%factor == 0:
        return True
    else:
        return False
ll.Filter(CheckIfFactor,3)
#will only keep numbers dividable by 3
#any that arent will be removed from list
```

### CreateFromList(list)
-Returns a new linked list object with list values as node values

```python
a_regular_list = [1,2,3]    
a_linked_list = (linked_list.CreateFromList(a_regular_list))
#the first variable still exists

#the second variable is a new instance of the linked_list class

# the new linked_list instance contains 1,2,3 as its first 3 values.
```

### ReplaceIndex(index,data)
-Replaces the node at the given index with a new node containing the given data

### ReplaceData(old_data,new_data,method)
-Replaces the nodes at specficiced occurence(determined by method) with a new node containing the given data

Methods:
1. All Occurences (returns list of occurence indexes)
2. First Occurence (returns index)
3. Last Occurence (returns index)

### sorter(func_key,method=1)
-Sorts linked list using pythons built-in timsort

-Optional func_key argument can be given a function to sort the list by.

-Returns linked_list object based on method

Methods(default is 1):
1. Returns new instance of linked list with sorted data
2. Directly changes the content of the given linked list instance



### BubbleSort()
-Sorts the linked list using the bubble_sort algorithim

Info:
    
    Average/worst time complexity: O(n^2)

    Best time complexity: 0(n)
    
    Space Complexity: O(1)

### SelectionSort()
-Sorts the linked list using the selection sort algorithim

Info:
     
    Worst/Avg/Best time complexity: O(n^2)
     
    Space Complexity: O(1)

### MergeSort()
-Sorts the linked list using the merge sort algorithim

Info:

    Worst/Avg/Best Time Complexity: (n log n)

    Space Complexity: O(n)


### findMax(method)
-Returns maximum numerical value in list

-if data isnt int or float then it will be ignored

Methods:
1. return node with the max data 
2. return the max data

### findMin(method)
-Returns maximum numerical value in list

-if data isnt integer or float then it will be ignored

Methods:
1. return node with the max data 
2. return the max data

### SplitList(method)
-Splits linked list down middle

-The original list will not be changed

-If length is odd, the first half will be the bigger half

Methods:
1. Returns new linked list object containing data from the first half
2. Returns new linked list object containing data from the second half

### \_\_iter\_\_()
-Returns iterable generator object

-linked_list object is now iterable using list(list), "for" loops, etc

### CopyList()
-Does a "Deep" Copy - This means all contained nodes are copied as well

-Returns creates new linked_list instance with new node instances

### ReverseList(method=1)
-Returns link list after reversal

Methods:  (Default: 1)
1. Return the original list in reversed form
2. Return a reversed copy, without changing the original list

### SortedCheck()
-Returns True if list is sorted

-Returns False if list is not sorted

### MergeWith(second_list,SortedCheck=True)
-Will merge two sorted linked lists together

-Lists with any non-numerical value will raise an exception

-Returns merged COPY

-SortedCheck = True/False (Default: True)

-If SortedCheck=True, will iteratively ensure that both lists are sorted, if found that one isnt sorted, will return "SortedCheck_Result: At least one of Lists not sorted" without altering the lists or raising an exception

-If SortedCheck=False, will assume they are sorted, and will attempt to iteratively merge them as such. If the list wasn't sorted and the SortedCheck argument was set to false, it will work unexpectedly and result list will not be sorted

### RemoveDuplicates()
-Removes any duplicates iteratively

-Will keep the first occurence and remove all others

-Returns resolved instance afterwards

### Slicer(start, end,step=1)
- Slices linked_list at given indices
- Also called if self[x:y:z] is used
- Returns shallow copy instance

### shallow_copy()
 - Returns shallow copy of linked list instance

### shuffle()
- shuffles list elements
Methods:
1.  Returns linked list instance
2. Returns in array instead

# **TO BE ADDED**

