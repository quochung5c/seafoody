const router = require("express").Router();
const moment = require("moment");
const connection = require("../connection");

moment.locale("vi");

router.get("/", (req, res) => {
  connection.query(
    `SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, vaitro.positionName FROM ((Employee
          INNER JOIN User ON employee.user = user.uid)
         INNER JOIN vaitro ON employee.position = vaitro.posId);`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            status: item.workingStatus,
            email: item.email,
            phoneNumber: item.phoneNumber,
            position: item.positionName,
            location: item.location,
            joined_at: moment(item.created_at).format("LLLL")
          };
        })
      });
    }
  );
});

router.get("/searchById/:id", (req, res) => {
  connection.query(
    `SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, vaitro.positionName FROM ((Employee
                   INNER JOIN User ON employee.user = user.uid)
                  INNER JOIN vaitro ON employee.position = vaitro.posId)
                  where employee.empId = ${req.params.id}`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            status: item.workingStatus,
            email: item.email,
            phoneNumber: item.phoneNumber,
            location: item.location,
            joined_at: moment(item.created_at).format("LLLL")
          };
        })
      });
    }
  );
});

// Add employee
router.post("/:company", (req, res) => {
  // Validate
  connection.query(
    `SELECT * FROM Employee WHERE user = ${req.body.user}`,
    (error, document) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      if (document.length !== 0) {
        res.status(403).json({ message: "Nhân viên đã thuộc công ty khác" });
        return;
      }
      connection.query(
        `INSERT INTO Employee (firstName,lastName,workingStatus,user,company,position) VALUES 
        ('${req.body.firstName}','${req.body.lastName}',
        'Offline',${req.body.user},${req.params.company},${req.body.position});`,
        (err, doc) => {
          if (err) {
            res.status(400).json({ error: err });
            return;
          }
          res.status(201).json({ response: "Nhập dữ liệu thành công" });
        }
      );
    }
  );
});

router.get("/company/:company", (req, res) => {
  connection.query(
    `SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, vaitro.positionName FROM ((Employee
      INNER JOIN User ON employee.user = user.uid)
        INNER JOIN vaitro ON employee.position = vaitro.posId)
    WHERE employee.company = ${req.params.company};`,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item =>{
          return{
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            status: item.workingStatus,
            joined_at: moment(item.created_at).format('LLLL'),
            email: item.email,
            phoneNumber: item.phoneNumber,
            location: item.location,
            position: item.positionName
          }
        })
      });
    }
  );
});

router.get("/status/:status", (req, res) => {
  connection.query(
    `SELECT employee.empId as id, employee.firstName, employee.lastName, employee.workingStatus, employee.created_at, user.email, user.phoneNumber, user.location, vaitro.positionName FROM ((Employee
          INNER JOIN User ON employee.user = user.uid)
         INNER JOIN vaitro ON employee.position = vaitro.posId)
         where employee.workingStatus = '${req.params.status}' `,
    (error, doc) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.status(200).json({
        counts: doc.length,
        data: doc.map(item => {
          return {
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            status: item.workingStatus,
            email: item.email,
            phoneNumber: item.phoneNumber,
            location: item.location,
            joined_at: moment(item.created_at).format("LLLL")
          };
        })
      });
    }
  );
});

module.exports = router;
