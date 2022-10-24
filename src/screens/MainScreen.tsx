import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Colors, Metrics } from "../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { getRequest } from '../services/ApiService';
import { Props, Content } from '../types/Screens/MainScreen.types';

export default function ({ content, icon, url }: Props) {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (url) {
      const data = await getRequest(url);
      setData(data);
    }
  };

  const renderPost = (item: Content, data: any) => {
    return <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>

      {data.filter((p: any) => item.properties.categories.includes(p.category)).map((p: any) =>
        <View key={p.title} style={styles.post}>
          <FontAwesome5 color={Colors.black} name={icon} size={18} />
          <Text style={styles.postTitle}>{p.title}</Text>
        </View>
      )}

    </View>
  }

  const renderImage = () => {
    return <Image width={100} height={100} source={{ uri: '' }} />
  }

  return (
    <View style={styles.container}>
      {
        content.length > 0 ?
          <FlatList
            ListHeaderComponent={<View style={{ height: 15 }} />}
            data={content}
            keyExtractor={c => c.title}
            renderItem={({ item }) => {
              //implement all possible content types here;
              if (item.type === 'image') return renderImage();
              return renderPost(item, data);
            }}
          />
          :
          <Text>...</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: Colors.light_gray,
    width: Metrics.screenWidth,
    textAlign: 'center',
    padding: Metrics.baseWidth / 4,
    fontSize: 18
  },
  post: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseWidth,
    paddingVertical: Metrics.baseWidth / 4,
    alignItems: 'center',
  },
  postTitle: {
    marginLeft: 10
  }
});