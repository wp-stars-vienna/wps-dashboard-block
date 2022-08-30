import "./index.scss"
import DashboardBlockEditor from './editors/DashboardBlockEditor';


console.log('dashboard entry point')

wp.blocks.registerBlockType("wpsblocks/wps-dashboard-block", {
  title: "Dashboard Block",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {

  },
  edit: DashboardBlockEditor,
  save: function () {
    return null;
  }
})