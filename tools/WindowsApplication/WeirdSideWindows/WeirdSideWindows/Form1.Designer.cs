namespace WeirdSideWindows
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
      this.webBrowser1 = new System.Windows.Forms.WebBrowser();
      this.webBrowser2 = new System.Windows.Forms.WebBrowser();
      this.webBrowser3 = new System.Windows.Forms.WebBrowser();
      this.button1 = new System.Windows.Forms.Button();
      this.menuStrip1 = new System.Windows.Forms.MenuStrip();
      this.visitWebsiteToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
      this.visitWebsiteToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
      this.aboutUsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
      this.menuStrip1.SuspendLayout();
      this.SuspendLayout();
      // 
      // webBrowser1
      // 
      this.webBrowser1.Dock = System.Windows.Forms.DockStyle.Fill;
      this.webBrowser1.Location = new System.Drawing.Point(0, 24);
      this.webBrowser1.MinimumSize = new System.Drawing.Size(20, 20);
      this.webBrowser1.Name = "webBrowser1";
      this.webBrowser1.Size = new System.Drawing.Size(470, 389);
      this.webBrowser1.TabIndex = 0;
      // 
      // webBrowser2
      // 
      this.webBrowser2.Dock = System.Windows.Forms.DockStyle.Fill;
      this.webBrowser2.Location = new System.Drawing.Point(0, 24);
      this.webBrowser2.MinimumSize = new System.Drawing.Size(20, 20);
      this.webBrowser2.Name = "webBrowser2";
      this.webBrowser2.Size = new System.Drawing.Size(470, 389);
      this.webBrowser2.TabIndex = 1;
      this.webBrowser2.DocumentCompleted += new System.Windows.Forms.WebBrowserDocumentCompletedEventHandler(this.webBrowser2_DocumentCompleted);
      // 
      // webBrowser3
      // 
      this.webBrowser3.Location = new System.Drawing.Point(12, 24);
      this.webBrowser3.MinimumSize = new System.Drawing.Size(20, 20);
      this.webBrowser3.Name = "webBrowser3";
      this.webBrowser3.ScriptErrorsSuppressed = true;
      this.webBrowser3.Size = new System.Drawing.Size(433, 348);
      this.webBrowser3.TabIndex = 1;
      this.webBrowser3.Url = new System.Uri("http://www.youtube.com", System.UriKind.Absolute);
      // 
      // button1
      // 
      this.button1.Location = new System.Drawing.Point(68, 378);
      this.button1.Name = "button1";
      this.button1.Size = new System.Drawing.Size(75, 23);
      this.button1.TabIndex = 3;
      this.button1.Text = "Next Video";
      this.button1.UseVisualStyleBackColor = true;
      this.button1.Click += new System.EventHandler(this.button1_Click);
      // 
      // menuStrip1
      // 
      this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.visitWebsiteToolStripMenuItem});
      this.menuStrip1.Location = new System.Drawing.Point(0, 0);
      this.menuStrip1.Name = "menuStrip1";
      this.menuStrip1.Size = new System.Drawing.Size(470, 24);
      this.menuStrip1.TabIndex = 4;
      this.menuStrip1.Text = "menuStrip1";
      // 
      // visitWebsiteToolStripMenuItem
      // 
      this.visitWebsiteToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.visitWebsiteToolStripMenuItem1,
            this.aboutUsToolStripMenuItem});
      this.visitWebsiteToolStripMenuItem.Name = "visitWebsiteToolStripMenuItem";
      this.visitWebsiteToolStripMenuItem.Size = new System.Drawing.Size(52, 20);
      this.visitWebsiteToolStripMenuItem.Text = "About";
      this.visitWebsiteToolStripMenuItem.Click += new System.EventHandler(this.visitWebsiteToolStripMenuItem_Click);
      // 
      // visitWebsiteToolStripMenuItem1
      // 
      this.visitWebsiteToolStripMenuItem1.Name = "visitWebsiteToolStripMenuItem1";
      this.visitWebsiteToolStripMenuItem1.Size = new System.Drawing.Size(152, 22);
      this.visitWebsiteToolStripMenuItem1.Text = "Visit Website";
      this.visitWebsiteToolStripMenuItem1.Click += new System.EventHandler(this.visitWebsiteToolStripMenuItem1_Click);
      // 
      // aboutUsToolStripMenuItem
      // 
      this.aboutUsToolStripMenuItem.Name = "aboutUsToolStripMenuItem";
      this.aboutUsToolStripMenuItem.Size = new System.Drawing.Size(152, 22);
      this.aboutUsToolStripMenuItem.Text = "About Us";
      // 
      // Form1
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(470, 413);
      this.Controls.Add(this.button1);
      this.Controls.Add(this.webBrowser3);
      this.Controls.Add(this.webBrowser2);
      this.Controls.Add(this.webBrowser1);
      this.Controls.Add(this.menuStrip1);
      this.MainMenuStrip = this.menuStrip1;
      this.Name = "Form1";
      this.Text = "Weird Side of Youtube";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.menuStrip1.ResumeLayout(false);
      this.menuStrip1.PerformLayout();
      this.ResumeLayout(false);
      this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.WebBrowser webBrowser1;
        private System.Windows.Forms.WebBrowser webBrowser2;
        private System.Windows.Forms.WebBrowser webBrowser3;
        private System.Windows.Forms.Button button1;
    private System.Windows.Forms.MenuStrip menuStrip1;
    private System.Windows.Forms.ToolStripMenuItem visitWebsiteToolStripMenuItem;
    private System.Windows.Forms.ToolStripMenuItem visitWebsiteToolStripMenuItem1;
    private System.Windows.Forms.ToolStripMenuItem aboutUsToolStripMenuItem;
  }
}

