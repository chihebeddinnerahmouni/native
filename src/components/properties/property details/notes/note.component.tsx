import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from "react-native";
import { CalendarIcon, DeleteIcon } from "../../../../icons";
import { Note } from "../../../../backend/casaikos-api";
import { formatDateTime } from "../../../../utils";
import colors from "../../../../constants/colors";
import { getImageUrl } from "../../../../utils/validators/images.utils";
import { TextBody } from "../../../ui/texts/Texts.component";
import { useConfirm } from "../../../../hooks";

type NoteItemProps = {
  note: Note;
  style?: ViewStyle;
};

export const NoteItem = ({ note, style }: NoteItemProps) => {
  const { showConfirmation } = useConfirm();

  const onDeleteConfirm = () => {
    showConfirmation({
      title: "Delete Note",
      message:
        "Are you sure you want to delete this note?\nThis action cannot be undone.",
      onConfirm: () => {
        // TODO: Implement actual delete functionality
        // onDelete(note._id, propertyId);
        console.log("Note deleted:", note._id);
      },
      onCancel: () => {
        console.log("Delete cancelled");
      },
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.notesHeaderContainer}>
        <View style={styles.notesHeaderDate}>
          <CalendarIcon size={16} color={colors.primaryColor} />
          <TextBody style={styles.dateText}>
            {formatDateTime(note.createdAt)}
          </TextBody>
        </View>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={onDeleteConfirm}
          activeOpacity={0.7}
        >
          <DeleteIcon size={18} color={colors.textColor2} />
        </TouchableOpacity>
      </View>

      <TextBody style={styles.noteTitle}>{note.title}</TextBody>

      {/* <Text style={styles.noteUserName}>
        {note.user.firstName} {note.user.lastName}
      </Text> */}

      <TextBody style={styles.noteText}>{note.text}</TextBody>

      {note.images && note.images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}
          contentContainerStyle={styles.imagesContent}
        >
          {note.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                console.log("Image pressed:", getImageUrl(image));
              }}
            >
              <Image
                source={{ uri: getImageUrl(image) }}
                style={styles.noteImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 15,
    paddingHorizontal: 8,
    width: "100%",
    gap: 4,
    backgroundColor: colors.bgColor,
  },
  notesHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notesHeaderDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primaryColor,
  },
  deleteIcon: {
    padding: 4,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textColor,
    // marginTop: 4,
  },
  //   noteUserName: {
  //     fontSize: 13,
  //     color: colors.textColor2,
  //   },
  noteText: {
    color: colors.textColor2,
    fontSize: 12,
    fontWeight: "400",
    // marginTop: 4,
  },
  imagesContainer: {
    marginTop: 10,
    maxHeight: 120,
  },
  imagesContent: {
    gap: 10,
    paddingRight: 10,
  },
  noteImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
});
