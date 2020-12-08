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
//# sourceMappingURL=contents.vue.js.map