import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, TextInput, TouchableOpacity  } from "react-native";
import { Block, theme, Text, Button as GaButton, Accordion }  from "galio-framework";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, Button, Header, Tabs, Input } from "../components";
import { nowTheme } from "../constants";
import { firebase } from '../src/firebase/config'
const { width, height } = Dimensions.get('screen');

const QuantitySelector = (props) => {
    const [count, setCount] = useState(1)
    useEffect(()=> {
        if(count <= 1){
            setCount(1)
        } else if(count >= 12){
            setCount(12)
        }
    },[count])
  return (
    <Block row flex style={styles.container}>
        {/* <TouchableOpacity flex style={styles.btnLeft} disabled={count === 1} onPress={(e) => setCount(count - 1)} ><Text>&ndash;</Text></TouchableOpacity> */}
        {/* <input className="quantity-display" type="text" value={this.state.value} readOnly /> */}
        {/* <TextInput iconContent={<Block />} placeholder={""} shadowless style={styles.input} type="text" value={count} readOnly/> */}
        {/* <Text>{count}</Text> */}
        {/* <TouchableOpacity flex style={styles.btnLeft} disabled={count === 12} onPress={(e) => setCount(count + 1)} ><Text>&#xff0b;</Text></TouchableOpacity> */}
    </Block>

  );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 10,
        marginRight: 10,
        padding: 0
    },
    btnLeft: {
        height: 40,
        width: 40,
        fontSize: 40,
        backgroundColor: nowTheme.COLORS.PRIMARY,
        color: nowTheme.COLORS.TEXT,
        borderColor: nowTheme.COLORS.REDDIT,
        textAlign: "center"
    },
    btnRight:{

    },
    input: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        height: 45
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 10,
        marginRight: 10,
        padding: 0
      },
      actionButton: {
      },
      icon: {
        marginRight: 0,
        alignSelf: 'center'
      },
      quantityInput: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        height: 45
      }
});
export default QuantitySelector;