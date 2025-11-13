export const API_ENDPOINTS = {
  USER: {
    LOGIN: '/User/login',
    GET_ALL_USERS: '/User/get-all-users',
    GET_USER_BY_ID: '/User/get-user-by-id',
    UPDATE_USER: '/User/update-user',
    DELETE_USER: '/User/delete-user',
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: '/Dashboard/institute',
  },
  MASTER: {
    GET_ALL_MASTER: '/Master/get-all-masters',
    CREATE_NEW_MASTER: '/Master/create-master',
    GET_MASTER_BY_TYPE: '/Master/get-masters-by-type',
    UPDATE_MASTER: '/Master/update-master',
    DELETE_MASTER: '/Master/delete-master',
  },
  PACKAGES: {
    GET_ALL_PACKAGES: '/PackageMaster/get-all-packages',
    CREATE_NEW_PACKAGE: '/PackageMaster/create-package',
    GET_PACKAGE_BY_ID: '/PackageMaster/get-package-by-id',
    UPDATE_PACKAGE: '/PackageMaster/update-package',
    DELETE_PACKAGE: '/PackageMaster/delete-package',
  },
  INSTITUTE: {
    GET_ALL_INSTITUTES: '/InstituteMaster/get-all-institutes',
    CREATE_NEW_INSTITUTE: '/InstituteMaster/create-institute',
    GET_INSTITUTE_BY_ID: '/InstituteMaster/get-institute-by-id',
    UPDATE_INSTITUTE: '/InstituteMaster/update-institute',
    DELETE_INSTITUTE: '/InstituteMaster/delete-institute',
  },
  INSTITUTE_BRANCHES: {
    GET_ALL_BRANCHES: '/BranchMaster/get-all-branches',
    CREATE_NEW_BRANCH: '/BranchMaster/create-branch',
    GET_BRANCH_BY_ID: '/BranchMaster/get-branch-by-id',
    UPDATE_BRANCH: '/BranchMaster/update-branch',
    DELETE_BRANCH: '/BranchMaster/delete-branch',
  },
  COURSES: {
    GET_ALL_COURSES: '/Course/getAllCourses',
    CREATE_NEW_COURSE: '/Course/createCourse',
    GET_COURSE_BY_ID: '/Course/getCourseById',
    UPDATE_COURSE: '/Course/updateCourse',
    DELETE_COURSE: '/Course/deleteCourse',
    GET_COURSE_BY_INSTITUTE: '/Course/getCoursesByInstitute',
  },
};
