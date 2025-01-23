import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, Text } from "react-native";
import AlbumDetail from "@/components/details/album/layout";

export default function DetailsScreen() {
  const { type, id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [item, setItem] = useState({});
  const [find, setFind] = useState(false);

  // Récupérer les données
  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${type}/${id}`);
        const data = await response.json();
        setItem(data);
        setFind(true); // Les données sont maintenant disponibles
      } catch (err) {
        console.log(err);
      }
    };

    if (type && id) {
      getItem();
    }
  }, [type, id]);

  // Mettre à jour les options du header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AntDesign
          style={{ padding: 10 }}
          name="left"
          size={24}
          color="#000"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      title: item.pseudo || item.titre || item.nom || "Détails", // Titre par défaut si `item` est vide
    });
  }, [navigation, item]);

  // Afficher les détails de l'album
  if (type === "albums" && find ) {
    return <AlbumDetail item={item} />;
  }

  // Afficher un texte par défaut
  return <Text>Details of user {id} in type {type}</Text>;
}