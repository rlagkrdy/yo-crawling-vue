<template>
  <section class="contents-section">
    <div class="contents-box">
      <ul>
        <li v-for="student in students" :key="student.name">
          {{ student.name }}
        </li>

      </ul>

      <info-card/>
    </div>
  </section>
</template>

<script>
import InfoCard from '@/components/info-card';

export default {
  name: 'contents',
  components: { InfoCard },
  data() {
    return {
      students: []
    };
  },
  methods: {

    getData() {
      console.log('start get data');

      // eslint-disable-next-line no-undef
      // const db = firebase.firestore();
      //
      // db.collection('students').get().then((querySnapshot) => {
      //   querySnapshot.forEach(doc => {
      //     this.students.push(doc.data());
      //   });
      // });

      console.log('end get data');
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.contents-section {
  background: #e0e0e0;
  min-height: calc(100vh - 61px);
}

.contents-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1600px;
  padding: 120px 0;
  margin: 0 auto;
}
</style>
