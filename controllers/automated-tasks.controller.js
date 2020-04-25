import User from '../models/user.model';
import schedule from 'node-schedule';

class AutomatedTasks {
  resetCalories() {
    schedule.scheduleJob('0 0 * * 0', async () => {
      for await (const doc of User.find()) {
        const recomendedKcal = doc.consume.recomendedkcal;

        const day = doc.consume;

        const sum = (day.monday.total + day.tuesday.total + day.wednesday.total + day.thursday.total + day.friday.total + day.saturday.total + day.sunday.total) / 7;

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
                total: 0,
                items: []
              },
              tuesday: {
                total: 0,
                items: []
              },
              wednesday: {
                total: 0,
                items: []
              },
              thursday: {
                total: 0,
                items: []
              },
              friday: {
                total: 0,
                items: []
              },
              saturday: {
                total: 0,
                items: []
              },
              sunday: {
                total: 0,
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