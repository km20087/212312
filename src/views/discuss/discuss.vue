<template>
  <div><dis-table :data1="data1"></dis-table></div>
</template>
<script>
import DisTable from "./component";
export default {
  data() {
    return {
      data1: [
        { name: "1", cont: "1" },
        {
          name: "2",
          cont: "2",
          children: [
            { name: "2-1", cont: "2-1" },
            { name: "2-2", cont: "2-2" },
            { name: "2-3", cont: "2-3" },
          ],
        },
        { name: "3", cont: "3" },
        { name: "4", cont: "4" },
      ],
    };
  },
  components: {
    DisTable,
  },
};
</script>