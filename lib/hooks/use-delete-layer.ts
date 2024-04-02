import { useSelf, useMutation } from "@/liveblocks.config";

export const useDeleteLayer = () => {
  const seletion = useSelf((me) => me.presence.selection);

  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayersIds = storage.get("layerIds");

      for (const id of seletion) {
        liveLayers.delete(id);

        const index = liveLayersIds.indexOf(id);
        // remove the layer id from the array(index !== -1)
        if (index > -1) {
          liveLayersIds.delete(index);
        }
      }

      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [seletion]
  );
};
