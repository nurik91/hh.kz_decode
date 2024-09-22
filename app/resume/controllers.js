const Resume = require("./models/Resume");
const WorkingHistory = require("./models/WorkingHistory");
const Educaion = require("./models/Education");
const ForeignLanguage = require("./models/ForeignLanguage");
const ResumeEmploymentType = require("./models/ResumeEmploymentType");
const Education = require("./models/Education");
const EmploymentType = require("../employment-type/EmploymentType");
const City = require("../region/City");
const Country = require("../region/Country");
const { Op } = require('sequelize');

const createResume = async (req, res) => {
  try{
  // console.log(req.body, req.user);
  // console.log(req.body); // req.body доходять если все нужные поля заполнены после валидации

  const resume = await Resume.create({
    // создаем новое резюме поэтому используем функцию create
    // перечисляем необходимые поля
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    position: req.body.position,
    cityId: req.body.cityId,
    citizenship: req.body.citizenship,
    about: req.body.about,
    birthday: req.body.birthday,
    gender: req.body.gender,
    salary: req.body.salary,
    salary_type: req.body.salary_type,
    main_language: req.body.main_language,
    skills: req.body.skills,
    userId: req.user.id,
  });

  // для добавление в resume таблицу workingHistory
  if (req.body.workingHistories && req.body.workingHistories.length > 0)
    // WH>0 потомучто массив будет приходить
    // надо пробежаться по этому массиву req.body.workingHistories и создать все эти WH
    req.body.workingHistories.forEach(async (history) => {
      await WorkingHistory.create({
        resumeId: resume.id,
        company_name: history.company_name,
        company_description: history.company_description,
        responsibilities: history.responsibilities,
        start_date: history.start_date,
        end_date: history.end_date,
      });
    });

  // для добавление в resume таблицу education
  if (req.body.education && req.body.education.length > 0)
    req.body.education.forEach(async (edu) => {
      await Educaion.create({
        resumeId: resume.id,
        level: edu.level,
        university_name: edu.university_name,
        faculty: edu.faculty,
        major: edu.major,
        end_date: edu.end_date,
      });
    });

  // для добавление в resume таблицу ForeignLanguage
  if (req.body.foreignLanguages && req.body.foreignLanguages.length > 0)
    req.body.foreignLanguages.forEach(async (ln) => {
      await ForeignLanguage.create({
        resumeId: resume.id,
        level: ln.level,
        name: ln.name,
      });
    });

  // для добавление в resume таблицу ResumeEmploymentType
  if (req.body.employmentTypes && req.body.employmentTypes.length > 0)
    req.body.employmentTypes.forEach(async (employmentTypeId) => {
      await ResumeEmploymentType.create({
        resumeId: resume.id,
        employmentTypeId: employmentTypeId,
      });
    });

  // отправляем на фронтенд
  res.status(200).send(resume);
  } catch (error) {
    res.status(500).send(error)
  } 
};

const getMyResumes = async (req, res) => {
  try{
  const resumes = await Resume.findAll({ where: { userId: req.user.id } }); // я должен получить только мойи резюме
  res.status(200).send(resumes); // должны отправить весь список резюме пользователью
  } catch (error) {
    res.status(500).send(error)
  } 
};

const getResume = async (req, res) => {
  try{
  const resume = await Resume.findByPk(req.params.id, {
    // id резюме находим by Primary Key - findByPk
    include: [
      {
        model: WorkingHistory,
        as: "workingHistories",
      },
      {
        model: Education,
        as: "education",
      },
      {
        model: EmploymentType,
        as: "employmentTypes",
      },
      {
        model: ForeignLanguage,
        as: "foreignLanguages",
      },
      {
        model: City,
        as: "city",
      },
      {
        model: Country,
        as: "citizenshipObj",
      },
    ],
  });
  res.status(200).send(resume);
  } catch (error) {
    res.status(500).send(error)
  } 
};

const deleteResume = async (req, res) => {
  try{
  const data = await Resume.destroy({
    where: {
      id: req.params.id, // когда delete к нам будет приходить req.params.id
    },
  });
  console.log(data); // для проверки
  res.status(200).end();
  } catch (error) {
    res.status(500).send(error)
  } 
};

const editResume = async (req, res) => {
  try{
  await Resume.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      position: req.body.position,
      cityId: req.body.cityId,
      citizenship: req.body.citizenship,
      about: req.body.about,
      birthday: req.body.birthday,
      gender: req.body.gender,
      salary: req.body.salary,
      salary_type: req.body.salary_type,
      main_language: req.body.main_language,
      skills: req.body.skills,
      userId: req.user.id, // вот эти данные меняется. Мы будем перезаписывать всю инфо
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  // приступаем к остальным таблицам
  // сначала их будем удалять
  await WorkingHistory.destroy({
    where: {
      resumeId: req.body.id,
    },
  });

  await Educaion.destroy({
    where: {
      resumeId: req.body.id,
    },
  });

  await ResumeEmploymentType.destroy({
    where: {
      resumeId: req.body.id,
    },
  });

  await ForeignLanguage.destroy({
    where: {
      resumeId: req.body.id,
    },
  });

  // и заново пересоздаем все связанные с резюме таблицы

  // чтобы resumeId не менят в каждой таблице. Чтобы не перезаписвать все на req.body.id
  const resume = {
    id: req.body.id,
  };

  if (req.body.workingHistories && req.body.workingHistories.length > 0)
    // WH>0 потомучто массив будет приходить
    // надо пробежаться по этому массиву req.body.workingHistories и создать все эти WH
    req.body.workingHistories.forEach(async (history) => {
      await WorkingHistory.create({
        resumeId: resume.id,
        company_name: history.company_name,
        company_description: history.company_description,
        responsibilities: history.responsibilities,
        start_date: history.start_date,
        end_date: history.end_date,
      });
    });

  // для добавление в resume таблицу education
  if (req.body.education && req.body.education.length > 0)
    req.body.education.forEach(async (edu) => {
      await Educaion.create({
        resumeId: resume.id,
        level: edu.level,
        university_name: edu.university_name,
        faculty: edu.faculty,
        major: edu.major,
        end_date: edu.end_date,
      });
    });

  // для добавление в resume таблицу ForeignLanguage
  if (req.body.foreignLanguages && req.body.foreignLanguages.length > 0)
    req.body.foreignLanguages.forEach(async (ln) => {
      await ForeignLanguage.create({
        resumeId: resume.id,
        level: ln.level,
        name: ln.name,
      });
    });

  // для добавление в resume таблицу ResumeEmploymentType
  if (req.body.employmentTypes && req.body.employmentTypes.length > 0)
    req.body.employmentTypes.forEach(async (employmentTypeId) => {
      await ResumeEmploymentType.create({
        resumeId: resume.id,
        employmentTypeId: employmentTypeId,
      });
    });

  res.status(200).end();
  } catch (error) {
    res.status(500).send(error)
  } 
};

const searchResume = async(req, res) => {
  try{
  console.log(req.query);

    const options = {} // пустой объект это без каких либо условии, получить все вакансии

    const {q, cityId, salary_from, salary_to, salary_type, citizenship} = req.query // чтобы сохранить все в q
    
    if(q) {
        options[Op.or] = [
            { first_name: { [Op.iLike]: '%${q}%' }},
            { last_name: { [Op.iLike]: '%${q}%' }},
            { about: { [Op.iLike]: '%${q}%' }},
            { position: { [Op.iLike]: '%${q}%' }},
            { skills: { [Op.iLike]: '%${q}%' }},

        ]
    }

    if(citizenship) {
        options.citizenship = citizenship
    }

    if(cityId) {
        options.cityId = cityId
    }

    if(salary_from && !salary_to) {
      //                 greater от salary_from
      options.salary = { [Op.gte] : salary_from*1 }
    }
    else if(!salary_from && salary_to) {
      options.salary = { [Op.lte] : salary_to*1 }
    }
    else if(salary_from && salary_to) {
      options.salary = { [Op.between] : [salary_from*1, salary_to*1] } // будет искать все резюме которое находиться в этой вилке
    }

    if(salary_type) {
        options.salary_type = salary_type
    }

    // то что будет сохранить результат полученных вакансии
    const resumes = await Resume.findAll({
        where: options
    })

    res.status(200).send(resumes)
  } catch (error) {
    res.status(500).send(error)
  } 
}

module.exports = {
  createResume,
  getMyResumes,
  getResume,
  deleteResume,
  editResume,
  searchResume
};
