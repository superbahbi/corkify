import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';

class ScaleBar extends React.Component {
  render() {
    const {
      title,
      item,
      label
    } = this.props;


    var active1, active2, active3;
    if(item == 1){
      active1 = "true";
    } else if ( item == 2){
      active2 = "true";
    } else if ( item == 3){
      active3 = "true";
    }
    return (
    <Block flex style={{ marginTop: 10 }}>
        <Text style={styles.title}>
        {title}
        </Text>
        <Block flex={0.5} row middle style={{ marginBottom: 5 }}>
            <Block style={styles.scaleBG}>
            <Block style={ active1 ? styles.redscale : styles.scale}></Block>
            </Block>
            <Block style={styles.scaleBG}>
            <Block style={ active2 ? styles.redscale : styles.scale}></Block>
            </Block>
            <Block style={styles.scaleBG}>
            <Block style={ active3 ? styles.redscale : styles.scale}></Block>
            </Block>
        </Block>
        <Block flex={0.5} row middle style={{ marginBottom: 5 }}>
            <Block style={styles.scaleBG}>
            <Text style={styles.scaletext}>{label[0]}</Text>
            </Block>
            <Block style={styles.scaleBG}>
            <Text style={styles.scaletext}>{label[1]}</Text>
            </Block>
            <Block style={styles.scaleBG}>
            <Text style={styles.scaletext}>{label[2]}</Text>
            </Block>
        </Block>
    </Block>

    );
  }
}

ScaleBar.propTypes = {
  title: PropTypes.string,
  item: PropTypes.any,
  label: PropTypes.any
};

const styles = StyleSheet.create({
  scaleBG:{
    width: 100,
  },
  redscale: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    borderWidth: .5,
    borderColor: nowTheme.COLORS.BLOCK,
    padding: 2,
    margin: 0,
    borderRightColor: nowTheme.COLORS.BLACK,
    borderLeftColor: nowTheme.COLORS.BLACK,
  },
  scale: {
    backgroundColor: nowTheme.COLORS.BLOCK,
    borderWidth: .5,
    borderColor: nowTheme.COLORS.BLOCK,
    padding: 2,
    margin: 0,
    borderRightColor: nowTheme.COLORS.BLACK,
    borderLeftColor: nowTheme.COLORS.BLACK,
  },
  scaletext: {
    textAlign: "center",
    color: nowTheme.COLORS.TEXT
  },
  title: {
    fontFamily: 'montserrat-regular',
    paddingBottom: theme.SIZES.BASE / 4,
    marginTop: 20,
    color: nowTheme.COLORS.SECONDARY
  }
});

export default withNavigation(ScaleBar);
