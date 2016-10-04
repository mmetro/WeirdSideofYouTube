using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WeirdSideWindows
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void webBrowser2_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            var json = new System.Net.WebClient().DownloadString("http://www.weirdtube.wtf/api/getrandomvid/");
            // TODO: need to figure out how to link with JObject
            //dynamic data = JObject.Parse(json);
            //webBrowser2.Url = "https:////www.youtube.com//watch?v=" + data.vidID;
        }

    private void Form1_Load(object sender, EventArgs e)
    {

    }

    private void visitWebsiteToolStripMenuItem_Click(object sender, EventArgs e)
    {

    }

    private void visitWebsiteToolStripMenuItem1_Click(object sender, EventArgs e)
    {
      System.Diagnostics.Process.Start("http://www.weirdtube.wtf");
    }

    private void aboutUsToolStripMenuItem_Click(object sender, EventArgs e)
    {
      MessageBox.Show("Created at RPI RCOS.\nLicensed under the MIT license.", "About Us");
    }
  }
}
