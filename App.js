import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [display, show] = useState('');
  const [result, setNum] = useState('');
  const [sigFigs, setSF] = useState(0);

  useEffect(() => { 
    calcSigFigs();
  }, [display]);

  const buttonHit = (value) => {
    if (value === '=') {
      calc();
    } 
    else if (value === 'AC') {
      clear();
    } 
    else if (value === '<') {
      del();
    } 
    else if (value === '+/-') {
      sign();
    } 
    else if (value === 'SF') {
      calcSigFigs();
    } 
    else {
      ap(value);
    }
  };

  const ap = (value) => {
    show(display + value);
  };

  const clear = () => {
    show('');
    setNum('');
  };

  const del = () => {
    show(display.slice(0, -1));
  };

  const sign = () => {
    if (display.startsWith('-')) {
      show(display.slice(1));
    } 
    
    else {
      show('-' + display);
    }
  };

  const calc = () => {
    let exp = display;
    let result = calculate(exp);
    setNum(result.toString());

  };

  const calculate = (exp) => {
    let currentNum = '';
    let result = 0;
    let op = '+';

    for (let i = 0; i < exp.length; i++) {
      const char = exp[i];

      if (char === '+' || char === '-' || char === 'x' || char === '÷') {
        result = useOp(op, result, parseFloat(currentNum));
        op = char;
        currentNum = '';
      } 
      
      else {
        currentNum += char;
      }
    }

    result = useOp(op, result, parseFloat(currentNum));

    return result;
  };

  const useOp = (operator, n1, n2) => {
    if (operator === '+') {
      return n1 + n2;
    } 
    else if (operator === '-') {
      return n1 - n2;
    } 
    else if (operator === 'x') {
      return n1 * n2;
    } 
    else if (operator === '÷') {
      return n1 / n2;
    }
  };

  const calcSigFigs = () => {
    const num = parseFloat(display);
    let count;
  
    if (isNaN(num)) {
      count = 0;
    } 
    else {
      const strNum = num.toString();
      let dot = strNum.indexOf('.');
      
      if (isNaN(dot)) {
        count = strNum.length;
      } 
      else {
        let trim = strNum.replace(/0+$/, '');
        if (trim.endsWith('.')) {
          trim = trim.slice(0, -1);
        }
        if (dot === -1) {
          count = trim.length;
        } 
        else {
          count = trim.length - 1;
        }
      }
    }
  
    setSF(count);
  };

  return (
    <View style={styles.container}>

      <View style={styles.disCont}>
        <Text style={styles.disText}>{result || display}</Text>
        <Text style={styles.sigFigsText}>Significant Figures: {sigFigs}</Text>

      </View>

      <View style={styles.buttonBar}>
        <View style={styles.buttonRow}>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('÷')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('x')}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('AC')}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('<')}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('+/-')}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => buttonHit('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.bigButton]} onPress={() => buttonHit('=')}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonHit('SF')}>
            <Text style={styles.buttonText}>SF</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },

  disText: {
    fontSize: 36,
  },

  sigFigsText: {
    fontSize: 18,
    marginTop: 10,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    margin: 5,
    borderRadius: 10,
    width: 80,
    height: 80,
  },
  
  buttonBar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
  },

  bigButton: {
    width: 100,
  },

  buttonText: {
    fontSize: 28,
  },

});
