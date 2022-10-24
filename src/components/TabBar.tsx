import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text } from "react-native";
import MainScreen from "../screens/MainScreen";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Metrics } from "../constants";
import { getRequest } from '../services/ApiService';
import { Page } from '../types/Stacks/MainStack.types';

const defaultPage: Page = { "title": "Home", "icon": "home", "content": [], notifications: 0 };

const Tab = createMaterialBottomTabNavigator();

const TabBar = () => {

  //starts with default page because app needs at least one page to work;
  const [pages, setPages] = useState<Array<Page>>([defaultPage]);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    const pages = await getRequest('pages');
    setPages(pages);
  };

  const returnBadge = (tab: Page) => {
    if (tab.notifications > 0) {
      return (<View style={styles.badge}>
        <Text style={styles.badgeNumber}>{tab.notifications}</Text>
      </View>); 
    } else return (<></>);
  };

  return (
    <Tab.Navigator
      barStyle={styles.tabBar}
      inactiveColor={Colors.black}
      activeColor={Colors.black}
      initialRouteName="Home"
      labeled={false}
    >

      {
        pages.map(tab => {
          return <Tab.Screen
            key={tab.title}
            name={tab.title}
            children={() => <MainScreen content={tab.content} icon={tab.icon} url={tab.url} />}
            options={{
              tabBarLabel: tab.title,
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tab, {width: Metrics.screenWidth / pages.length}]}>
                  <FontAwesome5 color={focused ? Colors.black : Colors.dark_gray} name={tab.icon} size={focused ? 22 : 18} />
                  <Text style={[styles.tabTitle, {color: focused ? Colors.black : Colors.dark_gray}]}>{tab.title}</Text>
                  {returnBadge(tab)}
                </View>
              ),
            }}
          />
        })
      }

    </Tab.Navigator >
  );
}

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.light_gray
  },
  tab: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 10, 
    textAlign: "center"
  },
  badge: {
    backgroundColor: Colors.red, 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    position: 'absolute', 
    alignSelf: 'flex-end', 
    top: 0, 
    right: 4, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  badgeNumber: {
    color: 'white', 
    textAlign: 'center', 
    fontSize: 10
  }
})
