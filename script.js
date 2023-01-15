let div=document.querySelector("#div");
let mult=document.querySelector("#mult");
let min=document.querySelector("#min");
let plus=document.querySelector("#plus");
let disp=document.querySelector("#display");
let b=document.querySelectorAll(".b");
let C=document.querySelector("#C");
let back=document.querySelector("#back");
let check=0;
let dc=0;
disp.textContent="0";


//function for operands 
function change(event)
{
    if(disp.textContent=="0" )
        {
            
            disp.textContent=event.textContent.trim();
            check=0;
        }
    
    else 
        {
            disp.textContent=`${disp.textContent}${event.textContent.trim()}`;
            check=0;
        }

}


//function for operators 
function change_(event)
{
    
    if(disp.textContent!="0" ) 
        {   
            if(check==0)
            {
                
                disp.textContent=`${disp.textContent}${event.textContent.trim()}`;
                if(display.textContent.includes("."))
                {
                    dc=1;
                }
                else 
                {
                    dc=0;
                }
                check=1;
            };

        }
    else 
    {
        if(disp.textContent!="0" ) 
        {
            if(check==0)
            {
                disp.textContent=`${disp.textContent}${event.textContent.trim()}`;
                if(display.textContent.includes("."))
                {
                    dc=1;
                }
                else 
                {
                    dc=0;
                }

                check=1;
            }

        }
    }

}


//adding functionality for buttons besides C and backspace 
for(let i=0;i<b.length;i++)
{
    if(i==3 || i==7 || i==11 || i==15)
    {

        b[i].addEventListener('click', function()
        {
            
            change_(b[i]);
        });
    }
    else if( i!=14 && i!=12)
    {
        b[i].addEventListener('click', function()
    {
        change(b[i]);
    }); 

    }
}

//functionality for clear operation
C.addEventListener('click', function reset()
{
    display.textContent="0";
})


function ev(expression)
{
    let val=0;


}


function evaluate(expression)
    {
        let tokens = expression.split('');
  
         // Stack for numbers: 'values'
        let values = [];
  
        // Stack for Operators: 'ops'
        let ops = [];
  
        for (let i = 0; i < tokens.length; i++)
        {
             // Current token is a whitespace, skip it
            if (tokens[i] == ' ')
            {
                continue;
            }
  
            // Current token is a number,
            // push it to stack for numbers
            if (tokens[i] >= '0' && tokens[i] <= '9')
            {
                let sbuf = "";
                  
                // There may be more than
                // one digits in number
                while (i < tokens.length &&
                        tokens[i] >= '0' &&
                            tokens[i] <= '9' || tokens[i]=="." || tokens[i=="−"] )
                {
                    if(tokens[i]=="−")
                    {
                        sbuf=sbuf+"-";
                    }
                    sbuf = sbuf + tokens[i++];
                }
                values.push(Number(sbuf, 10));
                
                // Right now the i points to
                // the character next to the digit,
                // since the for loop also increases
                // the i, we would skip one
                //  token position; we need to
                // decrease the value of i by 1 to
                // correct the offset.
                  i--;
            }
  
            // Current token is an opening
            // brace, push it to 'ops'
            else if (tokens[i] == '(')
            {
                ops.push(tokens[i]);
            }
  
            // Closing brace encountered,
            // solve entire brace
            else if (tokens[i] == ')')
            {
                while (ops[ops.length - 1] != '(')
                {
                  values.push(applyOp(ops.pop(),
                                   values.pop(),
                                  values.pop()));
                }
                ops.pop();
            }
  
            // Current token is an operator.
            else if (tokens[i] == '+' ||
                     tokens[i] == '−' ||
                     tokens[i] == '×' ||
                     tokens[i] == '÷')
            {
                  
                // While top of 'ops' has same
                // or greater precedence to current
                // token, which is an operator.
                // Apply operator on top of 'ops'
                // to top two elements in values stack
                while (ops.length > 0 &&
                         hasPrecedence(tokens[i],
                                     ops[ops.length - 1]))
                {
                  values.push(applyOp(ops.pop(),
                                   values.pop(),
                                 values.pop()));
                }
  
                // Push current token to 'ops'.
                ops.push(tokens[i]);
            }
        }
  
        // Entire expression has been
        // parsed at this point, apply remaining
        // ops to remaining values
        while (ops.length > 0)
        {
            values.push(applyOp(ops.pop(),
                             values.pop(),
                            values.pop()));
        }
  
        // Top of 'values' contains
        // result, return it
        return values.pop();
    }
  
    // Returns true if 'op2' has
    // higher or same precedence as 'op1',
    // otherwise returns false.
    function hasPrecedence(op1, op2)
    {
        if (op2 == '(' || op2 == ')')
        {
            return false;
        }
        if ((op1 == '*' || op1 == '÷') &&
               (op2 == '×' || op2 == '−'))
        {
            return false;
        }
        else
        {
            return true;
        }
    }
  
    // A utility method to apply an
    // operator 'op' on operands 'a'
    // and 'b'. Return the result.
    function applyOp(op, b, a)
    {
        switch (op)
        {
        case '+':
            let w=(Number)(a+b);
            if(Number.isInteger(w))
            {
                return w;
            }
            return (a + b).toFixed(3);
        case '−':
            let x=(Number)(a-b);
            if(Number.isInteger(x))
            {
                return x;
            }
            return (a-b).toFixed(3);
        case '×':
            let y=(Number)(a*b);
            if(Number.isInteger(y))
            {
                return y;
            }
            return (a*b).toFixed(3);
        case '÷':
            if (b == 0)
            {
                window.alert("Cannot divide by zero");
                return;
            }
            let z=(Number)(a/b);
            if(Number.isInteger(z))
            {
                return z;
            }
            return (a / b).toFixed(3);
        }
        return 0;
    }
   
    //functionality for equals
    b[14].addEventListener('click', function()
    {
        if(check==0)
        {   
            let k=evaluate(display.textContent);
            display.textContent=k;
            if(!display.textContent.includes("."))
            {
                dc=0;
            }
        }
    })

    //functionaity for backspace
    back.addEventListener("click", function()
    {
        display.textContent=display.textContent.slice(0,-1);
    })
 
    //functionality for decimal point
    b[12].addEventListener("click", function()
    {
        if(dc==0)
        {
            change(b[12]);
            dc=1;
            check=0;
        }

    })

    