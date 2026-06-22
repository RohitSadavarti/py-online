// ============================================================
// QUESTION BANK
// 24 hand-built questions spanning all 8 sections of the spec.
// Each question is fully playable (dataset, starter code, solution,
// hints, and a lightweight validation rule set).
// ============================================================

const QUESTIONS = [

// ---------------- SECTION 1: MATPLOTLIB BASICS ----------------
{
  id: 1, section: 1, sectionTitle: "Matplotlib Basics", library: "matplotlib", difficulty: "Beginner",
  title: "Line Chart",
  description: "Plot a basic line chart showing monthly sales using Matplotlib. A line chart is the most fundamental way to show a trend over time.",
  learningObjective: "Learn plt.plot(), and how to add a title and axis labels.",
  expectedChartType: "Line Chart",
  dataset: { columns: ["Month", "Sales"], rows: [["Jan",12000],["Feb",18000],["Mar",15000],["Apr",25000],["May",30000],["Jun",22000]] },
  hints: [
    "Use plt.plot(df['Month'], df['Sales']) to draw the line.",
    "Add plt.title('Monthly Sales Trend'), plt.xlabel('Month') and plt.ylabel('Sales').",
    "Don't call plt.show() — the platform captures the figure automatically."
  ],
  starterCode: `import matplotlib.pyplot as plt

# df is already loaded for you with columns: Month, Sales

# TODO: plot Month on the x-axis and Sales on the y-axis
# TODO: add a title 'Monthly Sales Trend'
# TODO: label the x-axis 'Month' and y-axis 'Sales'
`,
  solution: `import matplotlib.pyplot as plt

plt.plot(df['Month'], df['Sales'])
plt.title('Monthly Sales Trend')
plt.xlabel('Month')
plt.ylabel('Sales')
`,
  expectedOutput: { type: "line", title: "Monthly Sales Trend", xlabel: "Month", ylabel: "Sales", legend: false },
  validationRules: ["type", "title", "xlabel", "ylabel"],
  explanation: "plt.plot() is the workhorse of Matplotlib — pass it an x series and a y series and it connects the points with a line. Common mistake: forgetting axis labels, which is the #1 thing interviewers flag in a 'review this chart' exercise. Interview tip: always be ready to explain *why* you chose a line chart (it implies a continuous trend, e.g. time)."
},
{
  id: 3, section: 1, sectionTitle: "Matplotlib Basics", library: "matplotlib", difficulty: "Beginner",
  title: "Dashed Line",
  description: "Re-draw the sales trend, but this time as a dashed line with a custom color — useful for distinguishing a forecast or secondary series from a primary one.",
  learningObjective: "Use the linestyle and color parameters of plt.plot().",
  expectedChartType: "Line Chart (dashed)",
  dataset: { columns: ["Month", "Sales"], rows: [["Jan",12000],["Feb",18000],["Mar",15000],["Apr",25000],["May",30000],["Jun",22000]] },
  hints: [
    "plt.plot() accepts linestyle='--' for dashed lines.",
    "Use color='orange' (or any named color / hex code).",
    "Keep the same title/labels conventions as a normal line chart."
  ],
  starterCode: `import matplotlib.pyplot as plt

# TODO: plot df['Month'] vs df['Sales'] as a DASHED orange line
# TODO: title 'Sales Forecast (Dashed)'
# TODO: label axes Month / Sales
`,
  solution: `import matplotlib.pyplot as plt

plt.plot(df['Month'], df['Sales'], linestyle='--', color='orange')
plt.title('Sales Forecast (Dashed)')
plt.xlabel('Month')
plt.ylabel('Sales')
`,
  expectedOutput: { type: "line", title: "Sales Forecast (Dashed)", xlabel: "Month", ylabel: "Sales", legend: false },
  validationRules: ["type", "title", "xlabel", "ylabel"],
  explanation: "linestyle accepts shorthand: '-' solid, '--' dashed, '-.' dash-dot, ':' dotted. Common mistake: passing 'dashed' instead of '--' (both actually work, but '--' is what most teams use by convention). Interview tip: dashed/dotted lines are the standard way analysts mark projections vs. actuals on a chart."
},
{
  id: 9, section: 1, sectionTitle: "Matplotlib Basics", library: "matplotlib", difficulty: "Beginner",
  title: "Legends",
  description: "Plot two products' monthly sales on the same axes and add a legend so the viewer can tell the lines apart.",
  learningObjective: "Plot multiple series and use plt.legend().",
  expectedChartType: "Multi-line Chart with Legend",
  dataset: { columns: ["Month", "ProductA", "ProductB"], rows: [["Jan",12000,9000],["Feb",18000,11000],["Mar",15000,14000],["Apr",25000,20000],["May",30000,26000],["Jun",22000,24000]] },
  hints: [
    "Call plt.plot() twice, once per product, each with a label='...' kwarg.",
    "Call plt.legend() once after both plots to render it.",
    "Give the chart a title like 'Product A vs Product B Sales'."
  ],
  starterCode: `import matplotlib.pyplot as plt

# df has columns: Month, ProductA, ProductB
# TODO: plot both products as separate lines with labels
# TODO: call plt.legend()
# TODO: add title and axis labels
`,
  solution: `import matplotlib.pyplot as plt

plt.plot(df['Month'], df['ProductA'], label='Product A')
plt.plot(df['Month'], df['ProductB'], label='Product B')
plt.title('Product A vs Product B Sales')
plt.xlabel('Month')
plt.ylabel('Sales')
plt.legend()
`,
  expectedOutput: { type: "line", title: "Product A vs Product B Sales", xlabel: "Month", ylabel: "Sales", legend: true },
  validationRules: ["type", "title", "xlabel", "ylabel", "legend"],
  explanation: "Each plt.plot() call with a label= becomes one legend entry; nothing shows up until you call plt.legend(). Common mistake: setting label= but forgetting the legend() call entirely. Interview tip: when asked to compare two series, always reach for a shared-axis line chart with a legend before reaching for two separate charts."
},

// ---------------- SECTION 2: MATPLOTLIB INTERMEDIATE ----------------
{
  id: 21, section: 2, sectionTitle: "Matplotlib Intermediate", library: "matplotlib", difficulty: "Intermediate",
  title: "Bar Chart",
  description: "Compare quarterly revenue across four regions using a vertical bar chart.",
  learningObjective: "Use plt.bar() to compare categories.",
  expectedChartType: "Bar Chart",
  dataset: { columns: ["Region", "Revenue"], rows: [["North",54000],["South",38000],["East",61000],["West",47000]] },
  hints: [
    "plt.bar(df['Region'], df['Revenue']) draws vertical bars.",
    "Title: 'Revenue by Region'.",
    "Label the y-axis 'Revenue' and x-axis 'Region'."
  ],
  starterCode: `import matplotlib.pyplot as plt

# TODO: bar chart of Revenue by Region
`,
  solution: `import matplotlib.pyplot as plt

plt.bar(df['Region'], df['Revenue'], color='#4C72B0')
plt.title('Revenue by Region')
plt.xlabel('Region')
plt.ylabel('Revenue')
`,
  expectedOutput: { type: "bar", title: "Revenue by Region", xlabel: "Region", ylabel: "Revenue", legend: false },
  validationRules: ["type", "title", "xlabel", "ylabel"],
  explanation: "Bar charts compare discrete categories; line charts imply continuity — using a line chart for categorical regions is a classic interview red flag. Common mistake: leaving bars in source order instead of sorting by value when ranking matters. Interview tip: be ready to explain when you'd sort bars (ranking questions) vs. keep a natural order (time, geography)."
},
{
  id: 28, section: 2, sectionTitle: "Matplotlib Intermediate", library: "matplotlib", difficulty: "Intermediate",
  title: "Scatter Plot",
  description: "Explore the relationship between hours studied and exam score using a scatter plot.",
  learningObjective: "Use plt.scatter() to visualize correlation between two numeric variables.",
  expectedChartType: "Scatter Plot",
  dataset: { columns: ["StudyHours", "ExamScore"], rows: [[1,42],[2,50],[3,58],[4,63],[5,70],[6,75],[7,81],[8,88],[9,90],[10,95]] },
  hints: [
    "plt.scatter(df['StudyHours'], df['ExamScore']).",
    "Title: 'Study Hours vs Exam Score'.",
    "This is the classic chart for showing correlation, not trend over time."
  ],
  starterCode: `import matplotlib.pyplot as plt

# TODO: scatter plot of StudyHours vs ExamScore
`,
  solution: `import matplotlib.pyplot as plt

plt.scatter(df['StudyHours'], df['ExamScore'], color='#DD8452')
plt.title('Study Hours vs Exam Score')
plt.xlabel('StudyHours')
plt.ylabel('ExamScore')
`,
  expectedOutput: { type: "scatter", title: "Study Hours vs Exam Score", xlabel: "StudyHours", ylabel: "ExamScore", legend: false },
  validationRules: ["type", "title", "xlabel", "ylabel"],
  explanation: "Scatter plots are the go-to for 'is there a relationship between X and Y' questions. Common mistake: using a line chart instead, which falsely implies the x-axis is ordered/continuous in a meaningful sequence. Interview tip: mention correlation vs. causation — a scatter plot showing a relationship is not proof of cause and effect."
},
{
  id: 30, section: 2, sectionTitle: "Matplotlib Intermediate", library: "matplotlib", difficulty: "Intermediate",
  title: "Pie Chart",
  description: "Show browser market share as a pie chart with percentage labels.",
  learningObjective: "Use plt.pie() with autopct for percentage labels.",
  expectedChartType: "Pie Chart",
  dataset: { columns: ["Browser", "MarketShare"], rows: [["Chrome",65],["Safari",18],["Edge",8],["Firefox",6],["Other",3]] },
  hints: [
    "plt.pie(df['MarketShare'], labels=df['Browser'], autopct='%1.1f%%').",
    "Title: 'Browser Market Share'.",
    "Pie charts don't need x/y axis labels — skip plt.xlabel/ylabel here."
  ],
  starterCode: `import matplotlib.pyplot as plt

# TODO: pie chart of MarketShare with Browser labels and percentage labels
`,
  solution: `import matplotlib.pyplot as plt

plt.pie(df['MarketShare'], labels=df['Browser'], autopct='%1.1f%%')
plt.title('Browser Market Share')
`,
  expectedOutput: { type: "pie", title: "Browser Market Share", xlabel: "", ylabel: "", legend: false },
  validationRules: ["type", "title"],
  explanation: "autopct='%1.1f%%' formats each wedge's percentage to one decimal place. Common mistake: using a pie chart for more than ~6 categories, which becomes unreadable — a bar chart is usually a better choice past that point. Interview tip: many data teams discourage pie charts entirely in favor of bar charts; know the argument for both sides."
},

// ---------------- SECTION 3: SEABORN BASICS ----------------
{
  id: 41, section: 3, sectionTitle: "Seaborn Basics", library: "seaborn", difficulty: "Beginner",
  title: "Count Plot",
  description: "Use Seaborn's countplot to show how many employees are in each department.",
  learningObjective: "Use sns.countplot() to visualize frequency of categorical values.",
  expectedChartType: "Count Plot",
  dataset: { columns: ["Department"], rows: [["Sales"],["Sales"],["Sales"],["IT"],["IT"],["HR"],["HR"],["HR"],["HR"],["Ops"],["Ops"],["Ops"]] },
  hints: [
    "sns.countplot(x='Department', data=df).",
    "Seaborn automatically counts occurrences for you — no manual aggregation needed.",
    "Set a title with plt.title(...)."
  ],
  starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

# TODO: countplot of Department
`,
  solution: `import seaborn as sns
import matplotlib.pyplot as plt

sns.countplot(x='Department', data=df)
plt.title('Employee Count by Department')
plt.xlabel('Department')
plt.ylabel('Count')
`,
  expectedOutput: { type: "bar", title: "Employee Count by Department", xlabel: "Department", ylabel: "Count", legend: false },
  validationRules: ["title"],
  explanation: "countplot is the Seaborn shortcut for 'how many rows per category' — it replaces a manual .value_counts() + bar chart with one line. Common mistake: passing already-aggregated counts into countplot (it expects raw rows, not pre-counted totals — use barplot for that). Interview tip: mention this distinction; it's a frequent confusion point."
},
{
  id: 44, section: 3, sectionTitle: "Seaborn Basics", library: "seaborn", difficulty: "Beginner",
  title: "Scatter Plot (with hue)",
  description: "Plot height vs weight, colored by gender, using Seaborn's scatterplot.",
  learningObjective: "Use the hue parameter to encode a third, categorical dimension with color.",
  expectedChartType: "Scatter Plot",
  dataset: { columns: ["Height", "Weight", "Gender"], rows: [[160,55,"F"],[165,60,"F"],[170,68,"M"],[175,75,"M"],[168,62,"F"],[180,82,"M"],[155,50,"F"],[178,79,"M"]] },
  hints: [
    "sns.scatterplot(x='Height', y='Weight', hue='Gender', data=df).",
    "hue automatically adds a legend for you.",
    "Title: 'Height vs Weight by Gender'."
  ],
  starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

# TODO: scatterplot of Height vs Weight, colored by Gender
`,
  solution: `import seaborn as sns
import matplotlib.pyplot as plt

sns.scatterplot(x='Height', y='Weight', hue='Gender', data=df)
plt.title('Height vs Weight by Gender')
`,
  expectedOutput: { type: "scatter", title: "Height vs Weight by Gender", xlabel: "Height", ylabel: "Weight", legend: true },
  validationRules: ["type", "title", "legend"],
  explanation: "hue is Seaborn's signature feature over raw Matplotlib — it splits points (or bars, or lines) by a category and colors + legends them automatically. Common mistake: forgetting hue needs a categorical (not continuous) column to look clean — Seaborn will still run on a continuous hue but produce a colorbar-style gradient instead of a legend."
},
{
  id: 48, section: 3, sectionTitle: "Seaborn Basics", library: "seaborn", difficulty: "Intermediate",
  title: "Box Plot",
  description: "Compare salary distributions across departments using a box plot — a great way to show spread and outliers at once.",
  learningObjective: "Use sns.boxplot() to visualize distribution (median, quartiles, outliers) per category.",
  expectedChartType: "Box Plot",
  dataset: { columns: ["Department", "Salary"], rows: [["Sales",45000],["Sales",52000],["Sales",48000],["IT",65000],["IT",72000],["IT",61000],["HR",40000],["HR",43000],["HR",39000],["Ops",50000],["Ops",55000],["Ops",47000]] },
  hints: [
    "sns.boxplot(x='Department', y='Salary', data=df).",
    "The box shows the IQR; the line inside is the median; dots beyond whiskers are outliers.",
    "Title: 'Salary Distribution by Department'."
  ],
  starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

# TODO: boxplot of Salary by Department
`,
  solution: `import seaborn as sns
import matplotlib.pyplot as plt

sns.boxplot(x='Department', y='Salary', data=df)
plt.title('Salary Distribution by Department')
plt.xlabel('Department')
plt.ylabel('Salary')
`,
  expectedOutput: { type: "other", title: "Salary Distribution by Department", xlabel: "Department", ylabel: "Salary", legend: false },
  validationRules: ["title", "xlabel", "ylabel"],
  explanation: "A box plot answers 'what's the spread, and are there outliers' in one glance — much more information-dense than a bar of averages. Common mistake: using a box plot when you only have a handful of points per category (under ~5) — the quartiles become meaningless noise; a strip/swarm plot is better there. Interview tip: this is a favorite 'explain this chart' question — practice describing whiskers, IQR, and outlier dots out loud."
},

// ---------------- SECTION 4: SEABORN ADVANCED ----------------
{
  id: 56, section: 4, sectionTitle: "Seaborn Advanced", library: "seaborn", difficulty: "Advanced",
  title: "Joint Plot",
  description: "Use sns.jointplot() to show the Height vs Weight scatter together with each variable's individual distribution on the margins.",
  learningObjective: "Combine a bivariate relationship with univariate marginal distributions in one figure.",
  expectedChartType: "Joint Plot",
  dataset: { columns: ["Height", "Weight"], rows: [[160,55],[165,60],[170,68],[175,75],[168,62],[180,82],[155,50],[178,79],[162,58],[172,70]] },
  hints: [
    "sns.jointplot(x='Height', y='Weight', data=df, kind='scatter').",
    "jointplot returns a JointGrid (not a single Axes) — that's expected here.",
    "Try kind='hex' or kind='kde' afterwards to see alternate marginal styles."
  ],
  starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

# TODO: jointplot of Height vs Weight
`,
  solution: `import seaborn as sns
import matplotlib.pyplot as plt

sns.jointplot(x='Height', y='Weight', data=df, kind='scatter')
`,
  expectedOutput: { type: "other", title: "", xlabel: "Height", ylabel: "Weight", legend: false, minAxes: 3 },
  validationRules: ["minAxes"],
  explanation: "jointplot builds three axes behind the scenes: the main scatter plus two marginal histograms. Common mistake: trying to call plt.title() on it directly — because it's a JointGrid, you need fig.suptitle(...) or g.fig.suptitle(...) instead. Interview tip: this chart is a strong answer whenever someone asks for 'a quick way to see both the relationship and each variable's distribution'."
},
{
  id: 59, section: 4, sectionTitle: "Seaborn Advanced", library: "seaborn", difficulty: "Advanced",
  title: "Heatmap",
  description: "Compute a correlation matrix of the numeric columns and visualize it as a heatmap with annotated values.",
  learningObjective: "Use sns.heatmap() with annot=True to visualize a correlation matrix.",
  expectedChartType: "Heatmap",
  dataset: { columns: ["Age", "Income", "SpendScore"], rows: [[25,30000,60],[34,45000,55],[45,70000,40],[23,28000,75],[52,90000,30],[31,40000,65],[40,60000,50],[28,32000,70]] },
  hints: [
    "First compute corr_matrix = df.corr(numeric_only=True).",
    "Then sns.heatmap(corr_matrix, annot=True, cmap='coolwarm').",
    "Title: 'Correlation Heatmap'."
  ],
  starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

# TODO: compute the correlation matrix of df, then heatmap it with annotations
`,
  solution: `import seaborn as sns
import matplotlib.pyplot as plt

corr_matrix = df.corr(numeric_only=True)
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')
`,
  expectedOutput: { type: "other", title: "Correlation Heatmap", xlabel: "", ylabel: "", legend: false },
  validationRules: ["title"],
  explanation: "Heatmaps are the standard way to scan many pairwise correlations at once — annot=True prints the numeric value inside each cell so you don't have to eyeball color alone. Common mistake: forgetting numeric_only=True (or excluding non-numeric columns manually) and getting an error from .corr() on mixed-type data. Interview tip: be ready to explain what a value near +1, -1, and 0 each mean."
},
{
  id: 62, section: 4, sectionTitle: "Seaborn Advanced", library: "seaborn", difficulty: "Advanced",
  title: "Regression Plot",
  description: "Plot years of experience vs salary with a fitted regression line overlaid on the scatter points.",
  learningObjective: "Use sns.regplot() to combine a scatter plot with a fitted linear trend line and confidence band.",
  expectedChartType: "Regression Plot",
  dataset: { columns: ["Experience", "Salary"], rows: [[1,32000],[2,38000],[3,45000],[4,50000],[5,58000],[6,63000],[7,70000],[8,76000],[9,83000],[10,90000]] },
  hints: [
    "sns.regplot(x='Experience', y='Salary', data=df).",
    "The shaded band around the line is the confidence interval — pass ci=None to hide it.",
    "Title: 'Experience vs Salary (with trend line)'."
  ],
  starterCode: `import seaborn as sns
import matplotlib.pyplot as plt

# TODO: regplot of Experience vs Salary
`,
  solution: `import seaborn as sns
import matplotlib.pyplot as plt

sns.regplot(x='Experience', y='Salary', data=df)
plt.title('Experience vs Salary (with trend line)')
plt.xlabel('Experience')
plt.ylabel('Salary')
`,
  expectedOutput: { type: "scatter", title: "Experience vs Salary (with trend line)", xlabel: "Experience", ylabel: "Salary", legend: false },
  validationRules: ["title", "xlabel", "ylabel"],
  explanation: "regplot is scatterplot + a fitted line in one call — great for quickly eyeballing whether a linear relationship is plausible before running a formal regression. Common mistake: treating the fitted line as proof of a strong relationship without checking the spread of points around it. Interview tip: mention this is descriptive, not inferential — for a real conclusion you'd report R² or run statsmodels."
},

// ---------------- SECTION 5: PLOTLY BASICS ----------------
{
  id: 71, section: 5, sectionTitle: "Plotly Basics", library: "plotly", difficulty: "Beginner",
  title: "Interactive Line Chart",
  description: "Build an interactive line chart of monthly revenue using Plotly Express — hover over points to see exact values.",
  learningObjective: "Use plotly.express.line() and store the result in a variable named fig.",
  expectedChartType: "Interactive Line Chart",
  dataset: { columns: ["Month", "Revenue"], rows: [["Jan",40000],["Feb",45000],["Mar",42000],["Apr",51000],["May",58000],["Jun",62000]] },
  hints: [
    "import plotly.express as px",
    "fig = px.line(df, x='Month', y='Revenue', title='Monthly Revenue')",
    "IMPORTANT: the platform looks for a variable literally named fig — don't rename it."
  ],
  starterCode: `import plotly.express as px

# TODO: build an interactive line chart, store it in a variable called fig
fig = None
`,
  solution: `import plotly.express as px

fig = px.line(df, x='Month', y='Revenue', title='Monthly Revenue')
`,
  expectedOutput: { type: "scatter", title: "Monthly Revenue", xlabel: "Month", ylabel: "Revenue", legend: false },
  validationRules: ["title"],
  explanation: "Plotly Express (px) is the high-level Plotly API — one function call produces a fully interactive chart with hover tooltips, zoom, and pan built in. Common mistake: calling fig.show() — in this sandbox that's unnecessary, the platform renders whatever is stored in fig. Interview tip: know when to reach for Plotly over Matplotlib — mainly when the audience needs to explore the data themselves (dashboards), not just view a static image (reports)."
},
{
  id: 72, section: 5, sectionTitle: "Plotly Basics", library: "plotly", difficulty: "Beginner",
  title: "Interactive Bar Chart",
  description: "Build an interactive bar chart comparing units sold per product.",
  learningObjective: "Use px.bar() and customize bar color by category.",
  expectedChartType: "Interactive Bar Chart",
  dataset: { columns: ["Product", "UnitsSold"], rows: [["Widget A",320],["Widget B",210],["Widget C",450],["Widget D",180]] },
  hints: [
    "fig = px.bar(df, x='Product', y='UnitsSold', color='Product').",
    "Add title='Units Sold by Product' as a kwarg.",
    "Remember the variable must be named fig."
  ],
  starterCode: `import plotly.express as px

# TODO: bar chart of UnitsSold by Product, stored in fig
fig = None
`,
  solution: `import plotly.express as px

fig = px.bar(df, x='Product', y='UnitsSold', color='Product', title='Units Sold by Product')
`,
  expectedOutput: { type: "bar", title: "Units Sold by Product", xlabel: "Product", ylabel: "UnitsSold", legend: true },
  validationRules: ["title"],
  explanation: "color='Product' tells Plotly to color each bar by its own category, which also auto-generates a legend. Common mistake: passing color a continuous numeric column when you wanted discrete category colors — Plotly will switch to a continuous color scale instead of distinct colors. Interview tip: in a real dashboard, color is one of your most valuable encoding channels — use it deliberately, not decoratively."
},
{
  id: 75, section: 5, sectionTitle: "Plotly Basics", library: "plotly", difficulty: "Intermediate",
  title: "Interactive Pie Chart",
  description: "Show the share of transactions by payment method as an interactive pie chart.",
  learningObjective: "Use px.pie() for an interactive, hoverable pie chart.",
  expectedChartType: "Interactive Pie Chart",
  dataset: { columns: ["PaymentMethod", "Share"], rows: [["UPI",48],["Card",27],["NetBanking",12],["COD",13]] },
  hints: [
    "fig = px.pie(df, names='PaymentMethod', values='Share').",
    "Add title='Payment Method Share'.",
    "Plotly pies are hoverable by default — no extra code needed for that."
  ],
  starterCode: `import plotly.express as px

# TODO: pie chart of Share by PaymentMethod, stored in fig
fig = None
`,
  solution: `import plotly.express as px

fig = px.pie(df, names='PaymentMethod', values='Share', title='Payment Method Share')
`,
  expectedOutput: { type: "pie", title: "Payment Method Share", xlabel: "", ylabel: "", legend: true },
  validationRules: ["title"],
  explanation: "px.pie's names/values arguments map directly to wedge label / wedge size. Common mistake: mixing up names and values (swapping them produces a chart that runs but is semantically wrong). Interview tip: same caveat as the Matplotlib pie chart — justify the choice over a bar chart when asked."
},

// ---------------- SECTION 6: PLOTLY ADVANCED ----------------
{
  id: 81, section: 6, sectionTitle: "Plotly Advanced", library: "plotly", difficulty: "Advanced",
  title: "Treemap",
  description: "Visualize sales by category and subcategory as a treemap — box size encodes magnitude, nesting encodes hierarchy.",
  learningObjective: "Use px.treemap() with a path= list to encode a hierarchy.",
  expectedChartType: "Treemap",
  dataset: { columns: ["Category", "Subcategory", "Sales"], rows: [["Electronics","Phones",50000],["Electronics","Laptops",70000],["Clothing","Men",30000],["Clothing","Women",42000],["Home","Furniture",25000],["Home","Decor",15000]] },
  hints: [
    "fig = px.treemap(df, path=['Category','Subcategory'], values='Sales').",
    "path defines the nesting order, outer to inner.",
    "Add title='Sales by Category and Subcategory'."
  ],
  starterCode: `import plotly.express as px

# TODO: treemap of Sales nested by Category > Subcategory, stored in fig
fig = None
`,
  solution: `import plotly.express as px

fig = px.treemap(df, path=['Category', 'Subcategory'], values='Sales', title='Sales by Category and Subcategory')
`,
  expectedOutput: { type: "treemap", title: "Sales by Category and Subcategory", xlabel: "", ylabel: "", legend: false },
  validationRules: ["title"],
  explanation: "Treemaps pack rectangles proportionally to value, nested by hierarchy — excellent when you have 2+ levels of categories and want both 'which group is biggest' and 'which sub-item within it is biggest' in one view. Common mistake: using a treemap for time-based data (it has no inherent ordering, so trends get lost). Interview tip: contrast with a stacked bar chart — treemaps scale to far more categories before becoming unreadable."
},
{
  id: 84, section: 6, sectionTitle: "Plotly Advanced", library: "plotly", difficulty: "Advanced",
  title: "Waterfall Chart",
  description: "Build a profit-bridge waterfall chart showing how starting revenue moves through costs to land at net profit.",
  learningObjective: "Use plotly.graph_objects.Waterfall to show cumulative increases and decreases.",
  expectedChartType: "Waterfall Chart",
  dataset: { columns: ["Stage", "Value"], rows: [["Revenue",100000],["COGS",-40000],["Operating Exp",-25000],["Tax",-10000],["Net Profit",0]] },
  hints: [
    "import plotly.graph_objects as go",
    "Use measure=['absolute','relative','relative','relative','total'] matching each row.",
    "fig = go.Figure(go.Waterfall(x=df['Stage'], y=df['Value'], measure=[...])); remember to set fig.update_layout(title=...)."
  ],
  starterCode: `import plotly.graph_objects as go

# TODO: build a Waterfall chart from Stage / Value, store the figure in fig
fig = None
`,
  solution: `import plotly.graph_objects as go

fig = go.Figure(go.Waterfall(
    x=df['Stage'],
    y=df['Value'],
    measure=['absolute', 'relative', 'relative', 'relative', 'total']
))
fig.update_layout(title='Profit Bridge Waterfall')
`,
  expectedOutput: { type: "waterfall", title: "Profit Bridge Waterfall", xlabel: "", ylabel: "", legend: false },
  validationRules: ["title"],
  explanation: "The measure list tells Plotly whether each bar is a starting total, a relative add/subtract, or a final total — get this wrong and the bars float in the wrong place. Common mistake: forgetting the final 'total' measure, which means the chart never shows a grounded ending bar. Interview tip: waterfall charts are a favorite in finance/FP&A interviews for explaining a profit bridge — practice narrating one out loud."
},
{
  id: 90, section: 6, sectionTitle: "Plotly Advanced", library: "plotly", difficulty: "Advanced",
  title: "Candlestick Chart",
  description: "Plot daily stock OHLC (open, high, low, close) data as a candlestick chart.",
  learningObjective: "Use plotly.graph_objects.Candlestick for financial time-series data.",
  expectedChartType: "Candlestick Chart",
  dataset: { columns: ["Date", "Open", "High", "Low", "Close"], rows: [
    ["2025-01-01",100,108,98,105],["2025-01-02",105,112,103,110],["2025-01-03",110,111,100,102],
    ["2025-01-04",102,109,101,107],["2025-01-05",107,115,106,113]
  ] },
  hints: [
    "import plotly.graph_objects as go",
    "fig = go.Figure(go.Candlestick(x=df['Date'], open=df['Open'], high=df['High'], low=df['Low'], close=df['Close']))",
    "Green candles close higher than they opened; red candles close lower."
  ],
  starterCode: `import plotly.graph_objects as go

# TODO: build a Candlestick chart from Date/Open/High/Low/Close, store in fig
fig = None
`,
  solution: `import plotly.graph_objects as go

fig = go.Figure(go.Candlestick(
    x=df['Date'], open=df['Open'], high=df['High'], low=df['Low'], close=df['Close']
))
fig.update_layout(title='Daily Stock Price')
`,
  expectedOutput: { type: "candlestick", title: "Daily Stock Price", xlabel: "", ylabel: "", legend: false },
  validationRules: ["title"],
  explanation: "Each candle encodes 4 numbers at once (open/high/low/close), which is why this chart type is the de facto standard in trading platforms instead of 4 separate line charts. Common mistake: swapping high and low, which silently produces nonsensical (inverted) candles. Interview tip: know the color convention — typically green/white = close > open (bullish), red/black = close < open (bearish)."
},

// ---------------- SECTION 7: FORMATTING CHALLENGES ----------------
{
  id: 97, section: 7, sectionTitle: "Formatting Challenges", library: "matplotlib", difficulty: "Intermediate",
  title: "Currency Formatting",
  description: "Plot monthly revenue and format the y-axis tick labels as currency (e.g. $40,000) instead of raw numbers.",
  learningObjective: "Use matplotlib.ticker.FuncFormatter (or StrMethodFormatter) to format axis ticks as currency.",
  expectedChartType: "Bar Chart (currency-formatted axis)",
  dataset: { columns: ["Month", "Revenue"], rows: [["Jan",40000],["Feb",45000],["Mar",42000],["Apr",51000],["May",58000],["Jun",62000]] },
  hints: [
    "from matplotlib.ticker import FuncFormatter",
    "Define a formatter: lambda x, pos: f'${x:,.0f}'",
    "ax = plt.gca(); ax.yaxis.set_major_formatter(FuncFormatter(...))"
  ],
  starterCode: `import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

# TODO: bar chart of Revenue by Month with the y-axis formatted as currency
`,
  solution: `import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

plt.bar(df['Month'], df['Revenue'])
plt.title('Monthly Revenue ($)')
plt.xlabel('Month')
plt.ylabel('Revenue')
ax = plt.gca()
ax.yaxis.set_major_formatter(FuncFormatter(lambda x, pos: f'\${x:,.0f}'))
`,
  expectedOutput: { type: "bar", title: "Monthly Revenue ($)", xlabel: "Month", ylabel: "Revenue", legend: false },
  validationRules: ["type", "title"],
  explanation: "FuncFormatter lets you control exactly how every tick label is rendered, independent of the underlying data. Common mistake: converting the actual data values to formatted strings (e.g. df['Revenue'] = '$' + df['Revenue'].astype(str)) — that breaks the numeric axis entirely instead of just changing the label text. Interview tip: this distinction (formatting display vs. mutating data) is exactly the kind of thing a reporting-analyst interview will probe."
},
{
  id: 102, section: 7, sectionTitle: "Formatting Challenges", library: "matplotlib", difficulty: "Intermediate",
  title: "Date Formatting",
  description: "Plot daily website visitors and format the x-axis to show clean, readable dates instead of raw date strings.",
  learningObjective: "Convert a date column to datetime and format tick labels cleanly.",
  expectedChartType: "Line Chart (formatted date axis)",
  dataset: { columns: ["Date", "Visitors"], rows: [["2025-01-01",1200],["2025-01-02",1350],["2025-01-03",1100],["2025-01-04",1500],["2025-01-05",1700],["2025-01-06",1600],["2025-01-07",1800]] },
  hints: [
    "df['Date'] = pd.to_datetime(df['Date']) converts the column to real datetime objects.",
    "plt.plot(df['Date'], df['Visitors']) then plt.gcf().autofmt_xdate() angles the labels so they don't overlap.",
    "Title: 'Daily Website Visitors'."
  ],
  starterCode: `import matplotlib.pyplot as plt
import pandas as pd

# TODO: convert df['Date'] to datetime, plot Visitors over Date, and auto-format the date axis
`,
  solution: `import matplotlib.pyplot as plt
import pandas as pd

df['Date'] = pd.to_datetime(df['Date'])
plt.plot(df['Date'], df['Visitors'])
plt.title('Daily Website Visitors')
plt.xlabel('Date')
plt.ylabel('Visitors')
plt.gcf().autofmt_xdate()
`,
  expectedOutput: { type: "line", title: "Daily Website Visitors", xlabel: "Date", ylabel: "Visitors", legend: false },
  validationRules: ["type", "title", "xlabel", "ylabel"],
  explanation: "Converting to pd.to_datetime first means Matplotlib understands the axis is time-based, which unlocks smart tick spacing and rotation. Common mistake: leaving dates as plain strings — Matplotlib then treats every unique string as an arbitrary category, which looks fine for a handful of points but breaks down (and mis-orders) at scale. Interview tip: this exact step is the first thing to check when someone says 'my date axis looks wrong'."
},
{
  id: 104, section: 7, sectionTitle: "Formatting Challenges", library: "matplotlib", difficulty: "Advanced",
  title: "Secondary Axis",
  description: "Plot revenue (bars) and profit margin % (line) on the same chart using a secondary y-axis, since they're on very different scales.",
  learningObjective: "Use ax.twinx() to create a second y-axis sharing the same x-axis.",
  expectedChartType: "Combo Chart (dual axis)",
  dataset: { columns: ["Month", "Revenue", "MarginPct"], rows: [["Jan",40000,12],["Feb",45000,14],["Mar",42000,11],["Apr",51000,16],["May",58000,18],["Jun",62000,20]] },
  hints: [
    "fig, ax1 = plt.subplots() then ax1.bar(df['Month'], df['Revenue']).",
    "ax2 = ax1.twinx() creates a second y-axis sharing the same x-axis.",
    "ax2.plot(df['Month'], df['MarginPct'], color='red') draws the margin line on the new axis."
  ],
  starterCode: `import matplotlib.pyplot as plt

# TODO: bar chart of Revenue on the primary axis, line chart of MarginPct on a secondary axis
`,
  solution: `import matplotlib.pyplot as plt

fig, ax1 = plt.subplots()
ax1.bar(df['Month'], df['Revenue'], color='#4C72B0')
ax1.set_xlabel('Month')
ax1.set_ylabel('Revenue')

ax2 = ax1.twinx()
ax2.plot(df['Month'], df['MarginPct'], color='red', marker='o')
ax2.set_ylabel('Margin %')

plt.title('Revenue and Margin % by Month')
`,
  expectedOutput: { type: "bar", title: "Revenue and Margin % by Month", xlabel: "Month", ylabel: "Revenue", legend: false, minAxes: 2 },
  validationRules: ["title", "minAxes"],
  explanation: "twinx() is the standard pattern whenever two series share an x-axis but live on incompatible scales (e.g. revenue in tens of thousands vs. a percentage from 0-100). Common mistake: plotting both series on one axis anyway, which squashes the smaller-scale series into a flat line near zero. Interview tip: always label which axis is which explicitly (axis labels and/or differently colored ticks) — a dual-axis chart with no clear labeling is a common 'misleading chart' interview critique."
},

// ---------------- SECTION 8: REAL-WORLD PROJECTS ----------------
{
  id: 111, section: 8, sectionTitle: "Real-World Projects", library: "matplotlib", difficulty: "Advanced",
  title: "Sales Dashboard (Actual vs Target)",
  description: "Build a combo chart comparing actual sales (bars) against target sales (line) for each month — a staple of any sales performance review.",
  learningObjective: "Combine plt.bar() and plt.plot() on the same axes to compare actual vs. target.",
  expectedChartType: "Combo Chart",
  dataset: { columns: ["Month", "ActualSales", "TargetSales"], rows: [["Jan",40000,45000],["Feb",47000,45000],["Mar",43000,46000],["Apr",52000,48000],["May",60000,55000],["Jun",58000,57000]] },
  hints: [
    "plt.bar(df['Month'], df['ActualSales'], label='Actual') for the bars.",
    "plt.plot(df['Month'], df['TargetSales'], color='red', marker='o', label='Target') for the target line.",
    "Don't forget plt.legend() so the viewer can tell actual from target."
  ],
  starterCode: `import matplotlib.pyplot as plt

# TODO: bar chart of ActualSales + line overlay of TargetSales, with a legend
`,
  solution: `import matplotlib.pyplot as plt

plt.bar(df['Month'], df['ActualSales'], label='Actual', color='#4C72B0')
plt.plot(df['Month'], df['TargetSales'], color='red', marker='o', label='Target')
plt.title('Actual vs Target Sales')
plt.xlabel('Month')
plt.ylabel('Sales')
plt.legend()
`,
  expectedOutput: { type: "bar", title: "Actual vs Target Sales", xlabel: "Month", ylabel: "Sales", legend: true },
  validationRules: ["title", "legend"],
  explanation: "This combo pattern (bar for the actual result, line for the target/benchmark) is one of the most requested chart types in real reporting roles — it answers 'did we hit the goal' at a glance. Common mistake: using two different colors for actual bars that don't map to anything (e.g. red/green by month) instead of reserving color to distinguish actual vs. target. Interview tip: this is a great chart to bring up when asked for an example of a report you'd build for a CVM/performance review."
},
{
  id: 116, section: 8, sectionTitle: "Real-World Projects", library: "plotly", difficulty: "Advanced",
  title: "E-Commerce Order Status Dashboard",
  description: "E-commerce sellers track orders across statuses like Shipped, Delivered, RTO (Return to Origin), Cancelled, Return and Exchange. Build an interactive bar chart of order count by status.",
  learningObjective: "Use px.bar() with color-by-category to build a quick operational status dashboard.",
  expectedChartType: "Interactive Bar Chart",
  dataset: { columns: ["OrderStatus", "OrderCount"], rows: [["Delivered",1240],["Shipped",380],["RTO",210],["Cancelled",95],["Return",60],["Exchange",25]] },
  hints: [
    "fig = px.bar(df, x='OrderStatus', y='OrderCount', color='OrderStatus').",
    "Sort statuses by count first with df.sort_values('OrderCount', ascending=False) for a cleaner read.",
    "Title: 'Orders by Status'."
  ],
  starterCode: `import plotly.express as px

# TODO: bar chart of OrderCount by OrderStatus, sorted descending, stored in fig
fig = None
`,
  solution: `import plotly.express as px

sorted_df = df.sort_values('OrderCount', ascending=False)
fig = px.bar(sorted_df, x='OrderStatus', y='OrderCount', color='OrderStatus', title='Orders by Status')
`,
  expectedOutput: { type: "bar", title: "Orders by Status", xlabel: "OrderStatus", ylabel: "OrderCount", legend: true },
  validationRules: ["title"],
  explanation: "Sorting before plotting is what turns a flat bar chart into one that's instantly scannable for 'what's the biggest problem' — here, a high RTO count relative to Delivered is usually the first thing an ops review will flag. Common mistake: forgetting to sort, which leaves the eye doing the ranking work the chart should be doing. Interview tip: this exact chart shape (status breakdown, sorted, color-coded) is a strong example to bring into a Reporting Analyst interview when discussing dashboards you've built."
},
{
  id: 120, section: 8, sectionTitle: "Real-World Projects", library: "matplotlib", difficulty: "Advanced",
  title: "End-to-End Dashboard Challenge",
  description: "Bring it all together: build a 2x2 grid of subplots — a bar chart of revenue by region, a line chart of monthly sales trend, a pie chart of market share, and a scatter plot of study hours vs exam score — all in a single figure.",
  learningObjective: "Use plt.subplots(2, 2) to combine four different chart types into one dashboard-style figure.",
  expectedChartType: "Multi-panel Dashboard",
  dataset: { columns: ["Month", "Sales"], rows: [["Jan",12000],["Feb",18000],["Mar",15000],["Apr",25000],["May",30000],["Jun",22000]] },
  hints: [
    "fig, axes = plt.subplots(2, 2, figsize=(10, 8)) gives you a 2x2 grid of Axes.",
    "Index each panel: axes[0,0].bar(...), axes[0,1].plot(...), axes[1,0].pie(...), axes[1,1].scatter(...).",
    "Call plt.tight_layout() at the end so panels don't overlap, and fig.suptitle('Sales Overview Dashboard') for an overall title."
  ],
  starterCode: `import matplotlib.pyplot as plt

# df only has Month/Sales here — feel free to reuse it across panels
# TODO: build a 2x2 dashboard: bar, line, pie, scatter (any reasonable combination using df)
`,
  solution: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(10, 8))

axes[0,0].bar(df['Month'], df['Sales'])
axes[0,0].set_title('Sales by Month (Bar)')

axes[0,1].plot(df['Month'], df['Sales'], marker='o')
axes[0,1].set_title('Sales Trend (Line)')

axes[1,0].pie(df['Sales'], labels=df['Month'], autopct='%1.0f%%')
axes[1,0].set_title('Sales Share (Pie)')

axes[1,1].scatter(range(len(df)), df['Sales'])
axes[1,1].set_title('Sales (Scatter)')

fig.suptitle('Sales Overview Dashboard')
plt.tight_layout()
`,
  expectedOutput: { type: "other", title: "Sales Overview Dashboard", xlabel: "", ylabel: "", legend: false, minAxes: 4 },
  validationRules: ["minAxes"],
  explanation: "Multi-panel dashboards are how most real reporting decks are actually built — one suptitle, several focused panels, each answering one question. Common mistake: skipping plt.tight_layout(), which leaves titles and labels overlapping between panels. Interview tip: when asked to 'build a one-pager' for stakeholders, this subplot grid pattern is exactly the structure to describe."
}
];
