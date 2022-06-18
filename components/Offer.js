import React, { useState } from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView, Image } from "react-native";
import { Block, Text } from "galio-framework";
import ScaleBar from "./ScaleBar";
import { nowTheme } from "../constants";
const Offer = ({
  navigation,
  item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
  ctaRight,
  titleStyle,
}) => {
  const imageStyles = [
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];
  const titleStyles = [styles.cardTitle, titleStyle];
  const cardContainer = [styles.card, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
  ];
  var active1, active2, active3;
  if (item.body == 1) {
    active1 = "true";
  } else if (item.body == 2) {
    active2 = "true";
  } else if (item.body == 3) {
    active3 = "true";
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.item}
    >
      <Block row={horizontal} card key={item} flex style={cardContainer}>
        <Block flex style={imgContainer}>
          <Image
            style={{ height: 400, width: 400 }}
            source={{
              uri: item.image,
            }}
          />
        </Block>

        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Block>
              <Text>
                <Text style={styles.cardTitle} color={nowTheme.COLORS.PRIMARY}>
                  {item.year}{" "}
                </Text>
                <Text
                  style={styles.cardTitle}
                  color={nowTheme.COLORS.SECONDARY}
                >
                  {item.title}
                </Text>
              </Text>
            </Block>
            {item.alcohol ? (
              <Block flex>
                <Text size={14} color={"#9A9A9A"}>
                  {item.varietal} / {item.alcohol} / {item.ava}
                </Text>
              </Block>
            ) : (
              <Block />
            )}

            {item.body ? (
              <Block>
                <ScaleBar
                  title="Body"
                  item={item.body}
                  label={["Light", "Medium", "Full"]}
                />
              </Block>
            ) : (
              <Block />
            )}
            {item.dryScale ? (
              <Block>
                <ScaleBar
                  title="Sweet Dry Scale"
                  item={item.dryScale}
                  label={["Dry", "Semi-Sweet", "Sweet"]}
                />
              </Block>
            ) : (
              <Block />
            )}
            {item.notes ? (
              <Block flex left>
                <Text style={styles.title}>Tasting Notes</Text>
                <Block flex={0.5} row middle style={{ marginBottom: 5 }}>
                  {item.notes.map((i, index) => (
                    <Text key={i} style={{ color: nowTheme.COLORS.TEXT }}>
                      {i}
                      {", "}
                    </Text>
                  ))}
                </Block>
              </Block>
            ) : (
              <Block />
            )}
            {item.alcohol ? (
              <Block flex left>
                <Text style={styles.title}>ABV</Text>
                <Text style={{ color: nowTheme.COLORS.TEXT }}>
                  {item.alcohol}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.description ? (
              <Block flex left>
                <Text style={styles.title}>Product Description</Text>
                <Text
                  style={{ lineHeight: 13 * 1.5 }}
                  color={nowTheme.COLORS.TEXT}
                >
                  {item.description}
                </Text>
              </Block>
            ) : (
              <Block />
            )}
            {item.description ? (
              <Block flex left>
                <Text color={nowTheme.COLORS.MUTED}>
                  Free ground shipping on 6 or more bottles
                </Text>
              </Block>
            ) : (
              <Block />
            )}
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

Offer.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-regular",
    paddingBottom: nowTheme.SIZES.BASE / 4,
    marginTop: 20,
    color: nowTheme.COLORS.SECONDARY,
  },
  card: {
    backgroundColor: nowTheme.COLORS.WHITE,
    marginVertical: nowTheme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 100,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
    fontFamily: "montserrat-regular",
    fontSize: 30,
  },
  cardDescription: {
    marginTop: -30,
    paddingBottom: 20,
    backgroundColor: nowTheme.COLORS.WHITE,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderRadius: 10,
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageContainer: {
    elevation: 1,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default withNavigation(Offer);
