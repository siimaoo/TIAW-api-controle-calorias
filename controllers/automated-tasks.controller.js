import User from '../models/user.model';
import schedule from 'node-schedule';

class AutomatedTasks {
  resetCalories() {
    schedule.scheduleJob('0 0 * * 0', async () => {
      for await (const doc of User.find()) {
        const recomendedKcal = doc.consume.recomended;

        const day = doc.consume;

        const sum = (day.monday.totalOfDay + day.tuesday.totalOfDay + day.wednesday.totalOfDay + day.thursday.totalOfDay + day.friday.totalOfDay + day.saturday.totalOfDay + day.sunday.totalOfDay) / 7;

        let positive = 0;

        if (sum == recomendedKcal || (sum+150) == recomendedKcal || (sum-150) == recomendedKcal) {
          positive = doc.positiveWeeks + 1;
        } else {
          positive = doc.positiveWeeks;
        }

        User.findOneAndUpdate(doc.id, {
          
          $set: {
            positiveWeeks: positive,
          
            consume: {
              monday: {
                totalOfDay: 0,
                items: []
              },
              tuesday: {
                totalOfDay: 0,
                items: []
              },
              wednesday: {
                totalOfDay: 0,
                items: []
              },
              thursday: {
                totalOfDay: 0,
                items: []
              },
              friday: {
                totalOfDay: 0,
                items: []
              },
              saturday: {
                totalOfDay: 0,
                items: []
              },
              sunday: {
                totalOfDay: 0,
                items: []
              }
            },
          }
        }, (err, data) => {
          if (err) console.table({success: false, error: err});
        })
      }
    });
  }
}

export default new AutomatedTasks();