from sympy import Integral, Symbol,sympify,S, solve,Derivative,Limit,simplify,cos,sin,log, latex,pprint
import sys, json
import sympy
import math 
from sympy import Symbol
x = Symbol('x')
y = Symbol('y')
z = Symbol('z')
#Read data from stdin

    

def main():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    t = json.loads(lines[0])
    #get our data as an array from read_in()
    
 
    if '^' or '∞' in t :
        a = t.replace("^", "**")
        a = a.replace("∞","S.Infinity")
        a = a.replace('factorial','math.factorial')
        a = a.replace('log','math.log')
        a = a.replace('π','math.pi')
        a = a.replace('e', 'math.e')
        a = a.replace('Intmath.egral','Integral')
        a = a.replace('solvmath.e','solve')
        a = a.replace('≥','>=')
        a = a.replace('≤','<=')
        a = a.replace('Trumath.e','True')

        x = eval(a)
        x= str(x)
        x = x.replace('sqrt','√')
        x = x.replace('**','^')
        x =x.replace('oo','∞')
        print(x)
    else :
        x = eval(t)
        print(x)
 

    #use numpys sum method to find sum of all elements in the array
   #return the sum to the output stream
    

#start process
if __name__ == '__main__':
    main()

