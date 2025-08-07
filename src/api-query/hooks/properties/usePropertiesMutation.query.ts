import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
import {
  createProperty,
  // deleteFacilityHandler,
  // deleteProperty,
  // deletePropertyNoteHandler,
  // editAmenitiesHandler,
  // scrapingSyncHandler,
  updateProperty,
} from "../../api/properties.api";
import { CreatePropertyDto, Property } from "../../../backend/casaikos-api";
import { errorHandler } from "../../../utils/errors.utils";
import { showSuccessAlert } from "../../../components/ui/alerts/alerts.component";
// import { uploadPropertyNotesHandler } from "../../../utils";

type SavePropertyVariables = {
  CreatePropertyDto: CreatePropertyDto;
  selectedProperty?: Property;
};

type IResponse = {
  // deleteProperty: (propertyId: string) => Promise<void>;
  saveProperty: (variables: SavePropertyVariables) => Promise<Property>;
  isLoading: boolean;
  // editAmenities: UseMutateAsyncFunction<
  //   void,
  //   unknown,
  //   { propertyId: string; amenities: string[] },
  //   unknown
  // >;
  // isEditAmenitiesPending: boolean;
  // addNote: UseMutateAsyncFunction<
  //   Property,
  //   unknown,
  //   {
  //     propertyId: string;
  //     text: string;
  //     title: string | undefined;
  //     files: File[] | null;
  //   },
  //   unknown
  // >;
  // isAddNotePending: boolean;
  // deleteNote: UseMutateAsyncFunction<
  //   void,
  //   unknown,
  //   { propertyId: string; noteId: string },
  //   unknown
  // >;
  // addFacility: UseMutateAsyncFunction<
  //   Property,
  //   unknown,
  //   { property: Property; facility: string },
  //   unknown
  // >;
  // isAddFacilityPending: boolean;
  // deleteFacility: UseMutateAsyncFunction<
  //   void,
  //   unknown,
  //   { propertyId: string; facilityId: string },
  //   unknown
  // >;
  // scrapingSync: UseMutateAsyncFunction<void, unknown, string, unknown>;
  // isScrapingSyncPending: boolean;
};

export const usePropertiesMutation = (): IResponse => {
  // const deleteMutation = useMutation({
  //   mutationFn: deleteProperty,
  //   onSuccess: () => {
  //     toast.success("Property removed successfully");
  //     toast.info("All Property's placements has been removed successfully");
  //   },
  //   onError: errorHandler,
  // });

  const { mutateAsync: savePropertyMutationAsync, isPending: isSavePending } =
    useMutation({
      mutationFn: ({
        CreatePropertyDto,
        selectedProperty,
      }: SavePropertyVariables) => {
        return selectedProperty
          ? updateProperty(selectedProperty._id, CreatePropertyDto)
          : createProperty(CreatePropertyDto);
      },
      onSuccess: () => {
        showSuccessAlert("Success", "Property saved successfully");
      },
      onError: errorHandler,
    });

  // const editAmenitiesMutation = useMutation({
  //   mutationFn: ({
  //     propertyId,
  //     amenities,
  //   }: {
  //     propertyId: string;
  //     amenities: string[];
  //   }) => editAmenitiesHandler(propertyId, amenities),
  //   onSuccess: () => {
  //     toast.success("Amenities updated successfully");
  //   },
  //   onError: errorHandler,
  // });

  // const addNoteMutation = useMutation({
  //   mutationFn: ({
  //     propertyId,
  //     text,
  //     title,
  //     files,
  //   }: {
  //     propertyId: string;
  //     text: string;
  //     title: string | undefined;
  //     files: File[] | null;
  //   }) => uploadPropertyNotesHandler(propertyId, text, title, files),
  //   onSuccess: () => {
  //     toast.success("Note added successfully");
  //   },
  //   onError: errorHandler,
  // });

  // const deleteNoteMutation = useMutation({
  //   mutationFn: ({
  //     propertyId,
  //     noteId,
  //   }: {
  //     propertyId: string;
  //     noteId: string;
  //   }) => deletePropertyNoteHandler(propertyId, noteId),
  //   onSuccess: () => {
  //     toast.success("Note removed successfully");
  //   },
  //   onError: errorHandler,
  // });

  // const addFacilityMutation = useMutation({
  //   mutationFn: ({
  //     property,
  //     facility,
  //   }: {
  //     property: Property;
  //     facility: string;
  //   }) =>
  //     updateProperty(property._id, {
  //       ...property,
  //       facility: { name: facility },
  //       agentId: property.agent?._id ?? "",
  //     }),
  //   onSuccess: () => {
  //     toast.success("Facility added successfully");
  //   },
  //   onError: errorHandler,
  // });

  // const deleteFacilityMutation = useMutation({
  //   mutationFn: ({
  //     propertyId,
  //     facilityId,
  //   }: {
  //     propertyId: string;
  //     facilityId: string;
  //   }) => deleteFacilityHandler(propertyId, facilityId),
  //   onSuccess: () => {
  //     toast.success("Facility removed successfully");
  //   },
  //   onError: errorHandler,
  // });

  // const scrapingSync = useMutation({
  //   mutationFn: scrapingSyncHandler,
  //   onSuccess: () => {
  //     toast.success("Properties imported successfully from Airbnb.");
  //   },
  //   onError: errorHandler,
  // });

  return {
    // deleteProperty: deleteMutation.mutateAsync,
    saveProperty: savePropertyMutationAsync,
    isLoading: isSavePending,
    // editAmenities: editAmenitiesMutation.mutateAsync,
    // isEditAmenitiesPending: editAmenitiesMutation.isPending,
    // addNote: addNoteMutation.mutateAsync,
    // isAddNotePending: addNoteMutation.isPending,
    // deleteNote: deleteNoteMutation.mutateAsync,
    // addFacility: addFacilityMutation.mutateAsync,
    // isAddFacilityPending: addFacilityMutation.isPending,
    // deleteFacility: deleteFacilityMutation.mutateAsync,
    // scrapingSync: scrapingSync.mutateAsync,
    // isScrapingSyncPending: scrapingSync.isPending,
  };
};
